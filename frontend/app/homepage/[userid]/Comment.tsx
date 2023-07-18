import {getSessionIdServer} from "@/scripts/getSessionId";
import {cookies} from "next/dist/client/components/headers";

interface comment {
  id: number;
  comment: string;
  user: number;
  username: string;
}

interface post {
  id: number;
  image: string;
  user: number;
}

async function getComment(postId: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_URL_ORIGIN + "/api?endpoint=comment/get/" + postId,
    {
      cache: "no-store",
      headers: {
        sessionId: getSessionIdServer(cookies())
      }
    }
  );
  if (response.status === 200) {
    return await response.json();
  } else {
    return { id: 1, comment: "", user: 1, username: "No Comments" };
  }
}

export default async function Comment({
  postId,
  post,
}: {
  postId: string;
  post: post;
}) {
  const comment: comment = await getComment(postId);

  return (
    <div className="w-1/2 absolute bottom-[5%] left-[10%] text-white">
      <h2 className="font-semibold text-2xl">{comment["username"]}</h2>
      <p className="text-[9px] font-medium">{comment["comment"]}</p>
    </div>
  );
}
