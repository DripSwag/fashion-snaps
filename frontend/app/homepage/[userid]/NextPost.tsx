"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface post {
  id: number;
}

async function getPost() {
  const response = await fetch("http://127.0.0.1:8000/api/post/get", {
    cache: "no-store",
  });
  const body: post = await response.json();
  return body["id"].toString();
}

export default function NextPost() {
  const router = useRouter();

  async function clicked() {
    router.replace(
      "http://localhost:3000/homepage/1?postId=" + (await getPost())
    );
    router.refresh();
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
