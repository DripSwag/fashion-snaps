import { NextResponse } from "next/server";

interface post {
  id: number;
  image: string;
  user: number;
}

const API_ORIGIN = "http://127.0.0.1:8000/api/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response: post = await fetch(API_ORIGIN + endpoint).then((response) =>
    response.json()
  );
  response.image = "http://127.0.0.1:8000" + response.image;
  return NextResponse.json(response);
}
