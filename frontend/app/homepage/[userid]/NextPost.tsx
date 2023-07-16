"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface post {
  id: number;
}

async function getPost(userId: string) {
  //http://127.0.0.1:8000/api/post/get
  const response = await fetch(
    process.env.NEXT_PUBLIC_URL_ORIGIN + "/api?endpoint=post/get",
    {
      cache: "no-store",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: parseInt(userId) }),
    }
  );
  const body: post = await response.json();
  const postId = body.id !== undefined ? body.id : "0";
  return postId;
}

export default function NextPost({ userId }: { userId: string }) {
  const router = useRouter();

  async function clicked() {
    router.replace(
      "/homepage/" + userId + "?postId=" + (await getPost(userId))
    );
  }

  return (
    <button
      onClick={clicked}
      className="absolute bottom-[2%] left-1/2 -translate-x-1/2 font-bold text-2xl"
    >
      ⌄
    </button>
  );
}
