"use client";

import { useEffect, useState } from "react";

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

export default function Comment({ postId, post }: { postId: string, post: post }) {
  const [comment, setComment] = useState<comment>({
    id: 1,
    comment: "",
    user: 1,
    username: "",
  });

  async function getComment() {
    const response = await fetch(
      "http://127.0.0.1:8000/api/comment/get/" + postId
    );
    if (response.status === 200) {
      setComment(await response.json());
    } else {
      setComment({ id: 1, comment: "", user: 1, username: "No Comments" });
    }
  }

  useEffect(() => {
    getComment();
  }, [post]);

  return (
    <div className="w-1/2 absolute text-[10px] bottom-[5%] left-[5%] text-white">
      <h2 className="font-semibold text-xl">{comment["username"]}</h2>
      <p>{comment["comment"]}</p>
    </div>
  );
}
