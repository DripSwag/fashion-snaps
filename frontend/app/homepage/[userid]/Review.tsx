"use client";

import {
  createRef,
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
} from "react";

interface params {
  userId: string;
  postId: string;
}

async function clicked(
  ref: RefObject<HTMLTextAreaElement>,
  userId: string,
  postId: string,
  setLength: Dispatch<SetStateAction<number>>
) {
  if (ref.current?.value) {
    const response = await fetch("http://127.0.0.1:8000/api/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
        post: postId,
        comment: ref.current.value,
      }),
    });
    if (response.status === 200) {
      ref.current.value = "";
      setLength(0);
    }
  }
}

export default function Review({ userId, postId }: params) {
  const [length, setLength] = useState(0);
  const ref = createRef<HTMLTextAreaElement>();

  return (
    <div>
      <textarea
        maxLength={500}
        className="resize-none bg-neutral-100 h-64"
        onChange={(event) => {
          setLength(event.target.textLength);
        }}
        ref={ref}
      ></textarea>
      <p>{`${length}/500`}</p>
      <button
        onClick={() => {
          clicked(ref, userId, postId, setLength);
        }}
      >
        Post
      </button>
    </div>
  );
}
