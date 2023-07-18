"use client";

import { getSessionidClient } from "@/scripts/getSessionId";
import Cookies from "js-cookie";

interface post {
  id: number | null;
}

import { useRouter } from "next/navigation";

export default function PostHistroyClear({ userId }: { userId: string }) {
  const router = useRouter();

  async function handleClick() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_ORIGIN +
        "/api?endpoint=post/dequeue/" +
        userId,
      {
        method: "DELETE",
        headers: {
          sessionId: getSessionidClient(Cookies.get("sessionId")),
        },
      }
    );
    if (response.status === 200) {
      const bodyPost: post = await fetch(
        process.env.NEXT_PUBLIC_URL_ORIGIN + "/api?endpoint=post/get",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            sessionId: getSessionidClient(Cookies.get("sessionId")),
          },
          body: JSON.stringify({ user: parseInt(userId) }),
        }
      ).then((response) => response.json());

      const pathPostId =
        bodyPost.id !== undefined ? bodyPost.id?.toString() : "0";
      const path = "/homepage/" + userId + "?postId=" + pathPostId;
      router.replace(path);
      router.refresh();
    }
  }

  return (
    <button onClick={handleClick} className="text-neutral-600">
      Clear your seen post history
    </button>
  );
}
