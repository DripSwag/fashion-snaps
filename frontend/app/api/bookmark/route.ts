import { NextResponse } from "next/server";

const API_ORIGIN: string = process.env.API_ORIGIN ? process.env.API_ORIGIN : "";

export async function GET(request: Request) {
  const authToken = request.headers.get("sessionId");
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint, {
    headers: {
      AuthToken: authToken !== null ? authToken : "",
    },
  });
  if (response.status === 401) {
    return NextResponse.redirect("http://localhost:3000" || "");
  }
  if (response.status === 200) {
    return NextResponse.json(response);
  } else {
    return new NextResponse(null, { status: 204 });
  }
}
