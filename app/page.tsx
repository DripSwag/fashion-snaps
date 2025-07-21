import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { getPosts } from "./actions";
import Post from "@/components/Post";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  const posts = await getPosts();

  return (
    <main>
      <h1>Test</h1>
      {error === null ? (
        <Link href="/post">Post</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
      {posts?.map((value) => {
        return <Post src={value.signedUrl} key={value.id} />;
      })}
    </main>
  );
}
