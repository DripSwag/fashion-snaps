import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "@supabase/supabase-js";

export async function createPost(user: User, supabase: SupabaseClient) {
  return await supabase
    .from("Post")
    .insert({
      user: user.id,
    })
    .select("id");
}
