import Post from "./Post";

interface bookmark {
  id: number;
  post: {
    id: number;
    image: string;
    user: number;
  };
}

async function getBookmarks(userid: string) {
  const response = await fetch("http://127.0.0.1:8000/api/bookmark/" + userid, {
    cache: "no-store",
  });
  if (response.status === 200) {
    return await response.json();
  }
}

export default async function Collection({
  params,
}: {
  params: { userid: string };
}) {
  const bookmarks = await getBookmarks(params["userid"]);

  return (
    <main className="w-full">
      <div className="max-w-[1200px] flex flex-col relative left-1/2 -translate-x-1/2 py-12">
        <h1 className="font-bold text-4xl">Your Collection</h1>
        <div className="flex gap-8 py-4">
          {bookmarks &&
            bookmarks.map((data: bookmark) => {
              return (
                <Post
                  image={data.post.image}
                  postId={data.post.id.toString()}
                  userId={params.userid}
                  key={data.post.id}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}
