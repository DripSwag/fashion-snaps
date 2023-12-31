import React from "react";

export default function AccountLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {children}
      {modal}
    </div>
  );
}
