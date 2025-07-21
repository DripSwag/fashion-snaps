"use server";

import { createClient } from "@/utils/supabase/server";

export async function getPost(id: number) {
  const TIME = 60 * 60;
  const supabase = await createClient();

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
