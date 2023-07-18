import {getSessionIdServer} from "@/scripts/getSessionId";
import {cookies} from "next/dist/client/components/headers";
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
  const response = await fetch(
    process.env.NEXT_PUBLIC_URL_ORIGIN + "/api?endpoint=bookmark/" + userid,
    {
      cache: "no-store",
      headers: {
        sessionId: getSessionIdServer(cookies())
      }
    }
  );
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
    <main className="w-full flex justify-center">
      <div className="container">
        <h1 className="font-bold text-4xl">Your Collection</h1>
        <div className="flex gap-8 py-4">
          {bookmarks ? (
            bookmarks.map((data: bookmark) => {
              return (
                <Post
                  image={data.post.image}
                  postId={data.post.id.toString()}
                  userId={params.userid}
                  key={data.post.id}
                />
              );
            })
          ) : (
            <p>You currently have no posts bookmarked</p>
          )}
        </div>
      </div>
    </main>
  );
}
