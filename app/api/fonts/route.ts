import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const temp = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_KEY}`,
    {
      cache: "force-cache",
      next: {
        revalidate: false,
      },
    },
  ).then((value) => value.body);

  return new Response(temp);
}
