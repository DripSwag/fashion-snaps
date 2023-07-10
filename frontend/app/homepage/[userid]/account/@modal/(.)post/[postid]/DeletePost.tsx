"use client";

import { useRouter } from "next/navigation";

export default function DeletePost({ postId }: { postId: string }) {
  const router = useRouter();

  async function handleClick() {
    const response = await fetch(
      "http://127.0.0.1:8000/api/post/delete/" + postId,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      router.back();
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleClick}
      className="text-white bg-black px-8 py-4 rounded-lg my-4 relative left-1/2 -translate-x-1/2"
    >
      Delete
    </button>
  );
}
