"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="text-neutral-600 font-semibold h-auto"
    >
      X
    </button>
  );
}
