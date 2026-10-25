import { QueryData, SupabaseClient } from "@supabase/supabase-js";

export function getPosts(supabase: SupabaseClient<any, "public", any>) {
  const postsResponse = supabase.from("Post").select(`
    id,
    background_color,
    page_color,
    TextComponent(
      id,
      value,
      x,
      y,
      height,
      width
    ),
    ImageComponent(
      id,
      x,
      y,
      width,
      height,
      objects(
        name
      )
    )
  `);

  return postsResponse;
}
