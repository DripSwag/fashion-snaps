import { SupabaseClient } from "@supabase/supabase-js";
import { NoAuthorization } from "@/errors/noAuthorization";

export async function auth(supabase: SupabaseClient) {
  const userData = await supabase.auth.getUser();

  if (userData.data === null || userData.data.user === null) {
    throw new NoAuthorization();
  }

  return userData.data.user;
}
