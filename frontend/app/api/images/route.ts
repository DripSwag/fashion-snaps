import { NextResponse } from "next/server";

interface post {
  id: number;
  image: string;
  user: number;
}

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
  const body: post = await response.json();
  if (response.status === 401) {
    return NextResponse.redirect("http://localhost:3000" || "");
  }
  body.image = "http://127.0.0.1:8000" + body.image;
  return NextResponse.json(body);
}
