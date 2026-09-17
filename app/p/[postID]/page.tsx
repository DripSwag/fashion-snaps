import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import LikeSection from "@/components/p/[postID]/LikeSection";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export async function getPost(
  supabase: SupabaseClient<any, "public", any>,
  id: number,
) {
  const TIME = 60 * 60;

  const postResponse = await supabase
    .from("Post")
    .select("color, title, body, user")
    .eq("id", id);

  if (postResponse.data === null) {
    return null;
  }

  const postData = postResponse.data.at(0);

  const signedURL = await supabase.storage
    .from("post")
    .createSignedUrl(`${postData?.user}/${id}/image.png`, TIME);

  if (signedURL.data === null) {
    return null;
  }

  return {
    color: postData?.color,
    title: postData?.title,
    body: postData?.body,
    signedURL: signedURL.data.signedUrl,
  };
}

async function getLikes(
  supabase: SupabaseClient<any, "public", any>,
  userID: string,
  postID: number,
) {
  const likesData = await supabase
    .from("Like")
    .select("*", { count: "estimated" })
    .eq("post_id", postID);

  const userLikedData = await supabase
    .from("Like")
    .select()
    .eq("post_id", postID)
    .eq("user_id", userID);

  return {
    numberOfLikes: likesData.count ?? 0,
    userLiked: userLikedData.data?.length !== 0,
  };
}

interface Params {
  params: Promise<{ postID: string }>;
}

export default async function PostDetailed({ params }: Params) {
  const supabase = await createClient();
  const { postID } = await params;
  const userData = await supabase.auth.getUser();
  const postData = await getPost(supabase, parseInt(postID));

  const likesData = await getLikes(
    supabase,
    userData.data.user?.id ?? "",
    parseInt(postID),
  );

  if (postData === null) {
    redirect("/");
  }

  return (
    <main
      className="h-screen w-screen flex justify-center items-center"
      style={{ backgroundColor: postData.color }}
    >
      <div className="max-w-4/5 h-full flex justify-center items-center gap-32">
        <img src={postData.signedURL} className="h-3/4" />
        <div className="text-white flex flex-col gap-8">
          <h1 className="text-7xl font-bold">{postData.title}</h1>
          <p className="text-xl">{postData.body}</p>
          <LikeSection
            initialNumberOfLikes={likesData.numberOfLikes}
            initialUserLiked={likesData.userLiked}
            userID={userData.data.user?.id ?? ""}
            postID={parseInt(postID)}
          />
        </div>
      </div>
    </main>
  );
}
