import React from "react";
import Link from "next/link";
import Logout from "./Logout";
import { getSessionIdServer } from "@/scripts/getSessionId";
import { cookies } from "next/dist/client/components/headers";

interface post {
  id: number | null;
}

async function getHomepageUrl(userId: string) {
  const body: post = await fetch(
    process.env.NEXT_PUBLIC_URL_ORIGIN + "/api?endpoint=post/get",
    {
      cache: "no-store",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        sessionId: getSessionIdServer(cookies()),
      },
      body: JSON.stringify({ user: parseInt(userId) }),
    }
  ).then((response) => response.json());

  const pathPostId = body.id !== undefined ? body.id?.toString() : "0";
  return "/homepage/" + userId + "?postId=" + pathPostId;
}

export default async function HomepageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userid: string };
}) {
  const homepageUrl: string = await getHomepageUrl(params.userid);

  return (
    <section className="h-screen w-full flex flex-col items-center">
      <nav className="w-full h-16 py-4 px-4 flex items-center gap-4 max-w-[1200px]">
        <a href={homepageUrl} className="mx-4 font-bold text-xl">
          Fashion Snaps
        </a>
        <a href={homepageUrl}>Homepage</a>
        <Link href={`/homepage/${params["userid"]}/account`}>Account</Link>
        <a href={`/homepage/${params["userid"]}/collection`}>Collection</a>
        <Logout />
      </nav>
      {children}
    </section>
  );
}
