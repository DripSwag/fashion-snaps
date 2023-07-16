import NewPost from "./NewPost";
import Post from "./Post";

interface post {
  id: number;
  image: string;
  user: number;
}

async function getPosts(userId: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_URL_ORIGIN +
      "/api?endpoint=post/user/get/" +
      userId,
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
    <main className="flex justify-center w-full">
      <div className="container">
        <h1 className="font-bold text-4xl">Posts</h1>
        <div className="grid grid-cols-3 gap-8 w-full">
          {posts &&
            posts.map((data: post) => {
              return (
                <Post img={data["image"]} id={data["id"]} key={data["id"]} />
              );
            })}
          <NewPost />
        </div>
      </div>
    </main>
  );
}
