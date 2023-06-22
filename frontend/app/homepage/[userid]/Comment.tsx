"use client";

import { useEffect, useState } from "react";

interface params {
  postId: string;
}

interface comment {
  id: number;
  comment: string;
  user: number;
  username: string;
}

export default function Comment({ postId }: params) {
  const [comment, setComment] = useState("");

  const getComment = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/comment/get/" + postId
    );
    if (response.status === 200) {
      const body: comment = await response.json();
      setComment(body["comment"]);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div className="w-1/2 absolute text-xs bottom-[5%] left-[5%] text-white">
      {comment}
    </div>
  );
}
