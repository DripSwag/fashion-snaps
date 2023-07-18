"use client";

import { getSessionidClient } from "@/scripts/getSessionId";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function DeletePost({ postId }: { postId: string }) {
  const router = useRouter();

  async function handleClick() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_ORIGIN +
        "/api?endpoint=post/delete/" +
        postId,
      {
        method: "DELETE",
        headers: {
          sessionId: getSessionidClient(Cookies.get("sessionId")),
        },
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
