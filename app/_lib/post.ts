import { QueryData, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";
import { ShapeType } from "@/app/post/_enum/ShapeType";

type Client = SupabaseClient<Database>;

// ---- Shape of data/json stored in the PostData bucket ----

interface BaseBody {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
}

export type StoredComponent =
  | {
      component: "text";
      body: BaseBody & { value: string; font: string; size: number };
    }
  | { component: "image"; body: BaseBody & { imagePath: string } }
  | { component: "shape"; body: BaseBody & { type: ShapeType; color: string } };

export interface PostJson {
  components: StoredComponent[];
  backgroundColor: string;
  pageColor: string;
}

// ---- Query ----

function postsQuery(supabase: Client) {
  return supabase.from("Post").select("id");
}

// Row type derived from the query itself, so it can't drift from the select string
type PostRow = QueryData<ReturnType<typeof postsQuery>>[number];

export type PostWithData = PostRow & {
  components: StoredComponent[];
  backgroundColor: string;
  pageColor: string;
};

// ---- Fetching ----

async function getPostJson(
  supabase: Client,
  postID: number,
): Promise<PostJson> {
  const { data, error } = await supabase.storage
    .from("PostData")
    .download(`${postID}/data.json`);

  if (error) throw error;

  return JSON.parse(await data.text()) as PostJson;
}

export async function getPosts(supabase: Client): Promise<PostWithData[]> {
  const { data: posts, error } = await postsQuery(supabase);
  if (error) throw error;

  const results = await Promise.all(
    posts.map(async (post): Promise<PostWithData | null> => {
      try {
        const json = await getPostJson(supabase, post.id);
        return {
          ...post,
          backgroundColor: json.backgroundColor,
          pageColor: json.pageColor,
          components: [...json.components].sort((a, b) => a.body.z - b.body.z),
        };
      } catch (e) {
        // One broken post shouldn't take down the whole feed
        console.error(`Failed to load data for post ${post.id}`, e);
        return null;
      }
    }),
  );

  return results.filter((post): post is PostWithData => post !== null);
}
