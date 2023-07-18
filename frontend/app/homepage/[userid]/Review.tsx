"use client";

import Bookmark from "./Bookmark";

import { useRouter } from "next/navigation";
import {
  createRef,
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
} from "react";
import Cookies from "js-cookie";
import { getSessionidClient } from "@/scripts/getSessionId";

interface params {
  userId: string;
  postId: string;
}

export default function Review({ userId, postId }: params) {
  const [length, setLength] = useState(0);
  const ref = createRef<HTMLTextAreaElement>();
  const router = useRouter();

  async function handleClick() {
    if (ref.current?.value) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL_ORIGIN + "/api?endpoint=comment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            sessionId: getSessionidClient(Cookies.get("sessionId")),
          },
          body: JSON.stringify({
            user: userId,
            post: postId,
            comment: ref.current.value,
          }),
        }
      );
      if (response.status === 200) {
        ref.current.value = "";
        setLength(0);
        router.refresh();
      }
    }
  }

  return (
    <div className="w-max px-4 relative top-1/2 -translate-y-1/2">
      <textarea
        maxLength={500}
        className="resize-none bg-neutral-200 h-64 rounded-lg p-2"
        placeholder="Add your comment here"
        onChange={(event) => {
          setLength(event.target.textLength);
        }}
        ref={ref}
      ></textarea>
      <div className="flex w-full justify-between items-center py-2">
        <Bookmark userId={userId} postId={postId} />
        <div className="flex gap-2 items-center">
          <p className="text-neutral-600">{`${length}/500`}</p>
          <button
            onClick={handleClick}
            className="px-4 py-2 text-white bg-black rounded-lg"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
