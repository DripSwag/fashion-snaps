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
  return response;
}

export async function POST(request: Request) {
  const authToken = request.headers.get("sessionId");
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      AuthToken: authToken !== null ? authToken : "",
    },
    body: JSON.stringify(await request.json()),
  });
  if (response.status === 401) {
    return NextResponse.redirect("http://localhost:3000" || "");
  }
  return response;
}

export async function PUT(request: Request) {
  const authToken = request.headers.get("sessionId");
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      AuthToken: authToken !== null ? authToken : "",
    },
    body: JSON.stringify(await request.json()),
  });
  if (response.status === 401) {
    return NextResponse.redirect("http://localhost:3000" || "");
  }
  return response;
}

export async function DELETE(request: Request) {
  const authToken = request.headers.get("sessionId");
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint, {
    method: "DELETE",
    headers: {
      AuthToken: authToken !== null ? authToken : "",
    },
  });
  if (response.status === 401) {
    return NextResponse.redirect("http://localhost:3000" || "");
  }
  return response;
}
