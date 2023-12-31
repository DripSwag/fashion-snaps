import DeletePost from "./DeletePost";
import BackButton from "../../BackButton";
import {getSessionIdServer} from "@/scripts/getSessionId";
import {cookies} from "next/dist/client/components/headers";

interface post {
  id: number;
  image: string;
  user: number;
}

//That return needs a specific endpoint
async function getImage(postId: string) {
  try {
    const post: post = await fetch(
      process.env.NEXT_PUBLIC_URL_ORIGIN +
        "/api/images?endpoint=post/get/" +
        postId,
      {
        headers: {
          sessionId: getSessionIdServer(cookies())
        }
      }

    ).then((response) => response.json());
    return post["image"];
  } catch {
    return "";
  }
}

export default async function Post({ params }: { params: { postid: string } }) {
  const image = await getImage(params["postid"]);

  return (
    <div className="w-screen h-screen bg-[#61616199] fixed top-0 left-0">
      <div className="h-[80%] w-fit absolute px-8 pt-4 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#f8f8ff]">
        <BackButton />
        <img className="h-[80%] aspect-auto" src={image}></img>
        <DeletePost postId={params.postid} />
      </div>
    </div>
  );
}
