import React from "react";

export default function HomepageLayout({ children }: { children: React.ReactNode }){
  return(
    <>
      <nav>Nav</nav>
      {children}
    </>
  )
}
