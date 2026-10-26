"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { createPost } from "./_lib/db";
import { isImage } from "./_lib/discriminator";

export async function submit(
  components: Object[],
  backgroundColor: string,
  pageColor: string,
) {
  const supabase = await createClient();
  var redirectPath = null;

  try {
    const userData = await auth(supabase);

    const postResult = await createPost(userData, supabase);

    if (postResult.data === null) {
      throw postResult.error;
    }

    const postID = postResult.data[0].id;

    // Upload images first, replacing the File with its storage path
    const serialized = await Promise.all(
      components.map(async (component) => {
        if (!isImage(component)) return component;

        const { image, ...rest } = component.body;
        const path = `${postID}/${crypto.randomUUID()}-${image.name}`;

        const { error } = await supabase.storage
          .from("PostImage")
          .upload(path, image);
        if (error) throw error;

        return {
          component: "image",
          body: { ...rest, imagePath: path },
        };
      }),
    );

    const { error } = await supabase.storage
      .from("PostData")
      .upload(
        `${postID}/data.json`,
        JSON.stringify({ components: serialized, backgroundColor, pageColor }),
        { contentType: "application/json", upsert: true },
      );
    if (error) throw error;

    redirectPath = "/";
  } catch (e: any) {
    throw e;
  } finally {
    if (redirectPath !== null) {
      redirect(redirectPath);
    }
  }
}
