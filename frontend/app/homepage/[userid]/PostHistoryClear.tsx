"use client";

interface post {
  id: number | null;
}

import { useRouter } from "next/navigation";

export default function PostHistroyClear({ userId }: { userId: string }) {
  const router = useRouter();

  async function handleClick() {
    const response = await fetch("http://127.0.0.1:8000/api/post/dequeue/3", {
      method: "DELETE",
    });
    if (response.status === 200) {
      const bodyPost: post = await fetch("http://127.0.0.1:8000/api/post/get", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: parseInt(userId) }),
      }).then((response) => response.json());

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
