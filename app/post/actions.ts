"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { postText, createPost, postImage, postShape } from "./_lib/db";
import { isImage, isShape, isText } from "./_lib/discriminator";

export async function submit(components: Object[]) {
  const supabase = await createClient();
  var redirectPath = null;

  try {
    const userData = await auth(supabase);

    const postResult = await createPost(userData, supabase);

    if (postResult.data === null) {
      throw new Error();
    }

    const promises = [];
    const postID = postResult.data[0].id;

    for (var component of components) {
      var promise;
      if (isText(component)) {
        promise = postText(component, postID, supabase);
      } else if (isImage(component)) {
        promise = postImage(component, postID, supabase);
      } else if (isShape(component)) {
        promise = postShape(component, supabase, postID);
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
