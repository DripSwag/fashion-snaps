"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { postText, createPost } from "./_lib/db";
import { isText } from "./_lib/discriminator";

export async function submit(components: Object[]) {
  const supabase = await createClient();
  var redirectPath = null;

  try {
    const userData = await auth(supabase);

    const postID = await createPost(userData, supabase);

    if (postID.data === null) {
      throw new Error();
    }

    const promises = [];

    for (var component of components) {
      var promise;
      if (isText(component)) {
        promise = postText(component, postID.data[0].id, supabase);
      }
      promises.push(promise);
    }

    Promise.all(promises);

    redirectPath = "/";
  } catch (e: any) {
    throw e;
  } finally {
    if (redirectPath !== null) {
      redirect(redirectPath);
    }
  }
}
