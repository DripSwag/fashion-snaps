import React from "react";
import Link from "next/link";
import Logout from "./Logout";

export default async function HomepageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userid: string };
}) {
  //Add middleware so I dont need to call get post because the cache is stored and not cleared because the nav is persistent
  return (
    <section className="h-screen w-full flex flex-col items-center">
      <nav className="w-full h-16 py-4 px-4 flex items-center gap-4 max-w-[1200px]">
        <Link
          href={`/homepage/${params["userid"]}`}
          className="mx-4 font-bold text-xl"
        >
          Fashion Snaps
        </Link>
        <Link href={`/homepage/${params["userid"]}`}>Homepage</Link>
        <Link href={`/homepage/${params["userid"]}/account`}>Account</Link>
        <a href={`/homepage/${params["userid"]}/collection`}>Collection</a>
        <Logout />
      </nav>
      {children}
    </section>
  );
}
