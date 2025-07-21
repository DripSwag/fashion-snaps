"use client";

interface Props {
  src: string;
  key: number;
}

export default function Post({ src, key }: Props) {
  return <img src={src} key={key} />;
}
