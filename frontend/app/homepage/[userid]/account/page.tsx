import Post from "./Post";

interface post {
  id: number;
  image: string;
  user: number;
}

async function getPosts(userId: string) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/post/user/get/" + userId
  );
  if (response.status === 200) {
    const body = await response.json();
    console.log(body);
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
      <div className="max-w-[1200px] flex flex-col gap-4 my-12">
        <h1 className="font-bold text-4xl">Posts</h1>
        <div className="flex gap-8">
          {posts &&
            posts.map((data: post) => {
              return (
                <Post img={data["image"]} id={data["id"]} key={data["id"]} />
              );
            })}
        </div>
      </div>
    </main>
  );
}
