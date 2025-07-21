import { redirect } from "next/navigation";
import { getPost } from "./actions";

interface Params {
  params: Promise<{ postID: string }>;
}

export default async function PostDetailed({ params }: Params) {
  const { postID } = await params;

  const postData = await getPost(parseInt(postID));

  if (postData === null) {
    redirect("/");
  }

  return (
    <main
      className="h-screen w-screen flex justify-center items-center"
      style={{ backgroundColor: postData.color }}
    >
      <div className="max-w-4/5 h-full flex justify-center items-center gap-32">
        <img src={postData.signedURL} className="h-3/4" />
        <div>
          <h1>{postData.title}</h1>
          <p>{postData.body}</p>
        </div>
      </div>
    </main>
  );
}
