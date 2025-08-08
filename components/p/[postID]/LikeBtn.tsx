"use client";

import { MouseEventHandler } from "react";

interface Params {
  liked: boolean;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

export default function LikeBtn({ liked, handleClick }: Params) {
  return (
    <button onClick={handleClick} className="hover:cursor-pointer">
      {liked ? "Already Liked" : "Like"}
    </button>
  );
}
