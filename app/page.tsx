import { getPosts } from "./actions";
import Post from "@/components/Post";

export default async function Home() {
  const posts = await getPosts();

  console.log(posts);

  return (
    <main className="min-h-screen">
      {posts?.map((value) => {
        return (
          <Post
            src={value.signedUrl}
            key={value.id}
            id={value.id}
            bgColor={value.bgColor}
          />
        );
      })}
    </main>
  );
}
