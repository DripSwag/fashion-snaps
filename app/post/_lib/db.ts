import { SupabaseClient } from "@supabase/supabase-js";
import {
  ImagePayload,
  Payload,
  ShapePayload,
  TextPayload,
} from "../_interfaces/payloads";
import { User } from "@supabase/supabase-js";
import { Database } from "@/database.types";

export async function postText(
  text: TextPayload,
  postID: number,
  supabase: SupabaseClient,
) {
  const componentID = await createComponent(supabase, text, postID);
  const textResult = supabase.from("TextComponent").insert({
    component: componentID,
    value: text.body.value,
    font: text.body.font,
    size: text.body.size,
  });

  return textResult;
}

export async function postImage(
  image: ImagePayload,
  postID: number,
  supabase: SupabaseClient,
) {
  const bucketResult = await supabase.storage
    .from("PostImage")
    .upload(`${postID}/${image.body.image.name}`, image.body.image);

  if (bucketResult.data === null) {
    throw new Error();
  }

  const componentID = await createComponent(supabase, image, postID);

  const shapeResult = await supabase.from("ImageComponent").insert({
    component: componentID,
    image: bucketResult.data.id,
  });

  return shapeResult;
}

export async function postShape(
  shape: ShapePayload,
  supabase: SupabaseClient,
  postID: number,
) {
  const componentID = await createComponent(supabase, shape, postID);

  const shapeResult = supabase.from("ShapeComponent").insert({
    component: componentID,
    type: shape.body.type,
    color: shape.body.color,
  });

  return shapeResult;
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

async function createComponent<T extends Payload>(
  supabase: SupabaseClient<Database>,
  payload: T,
  postID: number,
) {
  const result = await supabase
    .from("Component")
    .insert({
      width: payload.body.width,
      height: payload.body.height,
      x: payload.body.x,
      y: payload.body.y,
      z: payload.body.z,
      post: postID,
    })
    .select();

  if (result.data) {
    return result.data[0].id;
  }
}
