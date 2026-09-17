import { SupabaseClient } from "@supabase/supabase-js";
import { TextPayload } from "../_interfaces/text";
import { User } from "@supabase/supabase-js";

export async function postText(
  text: TextPayload,
  postID: number,
  supabase: SupabaseClient,
) {
  const temp = supabase.from("TextComponent").insert({
    post: postID,
    value: text.body.value,
    x: text.body.x,
    y: text.body.y,
    height: text.body.height,
    width: text.body.width,
  });

  return temp;
}

export async function createPost(user: User, supabase: SupabaseClient) {
  return await supabase
    .from("Post")
    .insert({
      user: user.id,
      background_color: "#ffffff",
      page_color: "#ffffff",
    })
    .select("id");
}
