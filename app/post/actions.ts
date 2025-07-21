"use server";

import { createClient } from "@/utils/supabase/server";

export async function submit(formData: FormData) {
  const supabase = await createClient();

  const userData = await supabase.auth.getUser();

  const postData = await supabase
    .from("Post")
    .insert({ user: userData.data.user?.id, color: formData.get("color") })
    .select();

  const imageFile = formData.get("image") as File;

  if (postData.error === null) {
    supabase.storage
      .from("post")
      .upload(
        `${userData.data.user?.id}/${postData.data[0].id}/image.png`,
        imageFile,
      );
  }
}
