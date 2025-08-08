"use client";

import LikeBtn from "@/components/p/[postID]/LikeBtn";
import { useState } from "react";

interface Params {
  initialNumberOfLikes: number;
  initialUserLiked: boolean;
  userID: string;
  postID: number;
}

export default function LikeSection({
  initialNumberOfLikes,
  userID,
  initialUserLiked,
  postID,
}: Params) {
  const [numberOfLikes, setNumberOfLikes] = useState(initialNumberOfLikes);
  const [userLiked, setUserLiked] = useState(initialUserLiked);

  async function handleClick() {
    if (userLiked) {
      setNumberOfLikes(numberOfLikes - 1);
    } else {
      setNumberOfLikes(numberOfLikes + 1);
    }

    setUserLiked(!userLiked);

    const body = await fetch(
      `${document.location.protocol}//${document.location.hostname}:${document.location.port}/api/likes`,
      {
        method: "POST",
        body: JSON.stringify({
          user_id: userID,
          post_id: postID,
        }),
      },
    ).then((response) => response.json());
  }

  return (
    <div>
      <h2>{numberOfLikes}</h2>
      <LikeBtn liked={userLiked} handleClick={handleClick} />
    </div>
  );
}
