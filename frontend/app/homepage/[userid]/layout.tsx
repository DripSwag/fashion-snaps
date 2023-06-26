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
    <section className="h-screen w-full flex flex-col">
      <nav>
        <Link href={`/homepage/${params["userid"]}`}>Homepage</Link>
        <Link href={`/homepage/${params["userid"]}/account`}>Account</Link>
        <Logout />
      </nav>
      {children}
    </section>
  );
}
