import { NextResponse } from "next/server";

const API_ORIGIN: string = process.env.API_ORIGIN ? process.env.API_ORIGIN : "";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint);
  if (response.status === 200) {
    return NextResponse.json(response);
  } else {
    return new NextResponse(null, { status: 204 });
  }
}
