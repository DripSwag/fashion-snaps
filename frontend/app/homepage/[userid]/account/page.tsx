import { cache } from "react";
import Post from "./Post";

interface post {
  id: number;
  image: string;
  user: number;
}

async function getPosts(userId: string) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/post/user/get/" + userId,
    {
      //Change to use tag revalidation
      cache: "no-store",
    }
  );
  if (response.status === 200) {
    const body = await response.json();
    return body;
  }
}

export default async function Account({
  params,
}: {
  params: { userid: string };
}) {
  const posts: Array<post> = await getPosts(params["userid"]);

  return (
    <main className="flex justify-center">
      <div className="container">
        <h1 className="font-bold text-4xl">Posts</h1>
        <div className="flex gap-8">
          {posts ? (
            posts.map((data: post) => {
              return (
                <Post img={data["image"]} id={data["id"]} key={data["id"]} />
              );
            })
          ) : (
            <p>You have currently have no posts</p>
          )}
        </div>
      </div>
    </main>
  );
}
