"use client";

import { useEffect, useState } from "react";

export default function Bookmark({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  const [clicked, setClicked] = useState<boolean>();

  async function pressed() {
    const response = await fetch("http://127.0.0.1:8000/api/bookmark", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
        post: postId,
      }),
    });
    if (response.status === 200) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  }

  //"http://127.0.0.1:8000/api/bookmark/" + userId + "/" + postId
  async function onLoad() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_ORIGIN +
        "/api?endpoint=bookmark/" +
        userId +
        "/" +
        postId
    );
    if (response.status === 204) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  }

  useEffect(() => {
    onLoad();
  }, [postId]);

  return (
    <button
      onClick={() => {
        pressed();
      }}
    >
      <svg fill="black" viewBox="0 0 16 16" className="aspect-square h-8">
        {clicked ? (
          <path d="M2 2v13.5a.5.5 0 00.74.439L8 13.069l5.26 2.87A.5.5 0 0014 15.5V2a2 2 0 00-2-2H4a2 2 0 00-2 2z" />
        ) : (
          <path d="M2 2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.777.416L8 13.101l-5.223 2.815A.5.5 0 012 15.5V2zm2-1a1 1 0 00-1 1v12.566l4.723-2.482a.5.5 0 01.554 0L13 14.566V2a1 1 0 00-1-1H4z" />
        )}
      </svg>
    </button>
  );
}
