import Comment from "./Comment";
import Review from "./Review";
import NextPost from "./NextPost";
import Bookmark from "./Bookmark";
import PostHistroyClear from "./PostHistoryClear";

interface post {
  id: number;
  image: string;
  user: number;
}

async function getPost(postId: string) {
  const postBody: post = await fetch(
    "http://127.0.0.1:8000/api/post/get/" + postId
  ).then((response) => response.json());
  const enqueueResponse = await fetch(
    "http://127.0.0.1:8000/api/post/enqueue",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: postBody.user, post: postBody.id }),
    }
  );
  return postBody;
}

export default async function Homepage({
  params,
  searchParams,
}: {
  params: { userid: string };
  searchParams: { postId: string };
}) {
  const post: post = await getPost(searchParams["postId"]);

  return (
    <div className="h-full w-full relative">
      {searchParams.postId !== "0" ? (
        <>
          <Review userId={params["userid"]} postId={searchParams["postId"]} />
          <div className="h-3/4 absolute top-1/2 -translate-y-1/2 w-max left-1/2 -translate-x-1/2">
            <img
              src={"http://127.0.0.1:8000" + post["image"]}
              className="h-full relative left-1/2 -translate-x-1/2"
            ></img>
            <Comment postId={searchParams["postId"]} post={post} />
          </div>
          <NextPost userId={params.userid} />
        </>
      ) : (
        <div className="h-full w-full">
          <p className="relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-max">
            There are currently no posts to view
          </p>
          <PostHistroyClear userId={params.userid} />
        </div>
      )}
    </div>
  );
}
