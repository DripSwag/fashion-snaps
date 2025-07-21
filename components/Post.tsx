"use client";

import Link from "next/link";

interface Props {
  src: string;
  id: number;
  bgColor: string;
}

export default function Post({ src, id, bgColor }: Props) {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{ backgroundColor: bgColor }}
    >
      <Link href={`/p/${id}`} className="h-3/4">
        <img src={src} className="h-full" />
      </Link>
    </div>
  );
}
