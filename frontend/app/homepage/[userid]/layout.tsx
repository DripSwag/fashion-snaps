import React from "react";

export default function HomepageLayout({ children }: { children: React.ReactNode }){
  return(
    <section className="h-screen w-full flex flex-col">
      <nav>Nav</nav>
      {children}
    </section>
  )
}
