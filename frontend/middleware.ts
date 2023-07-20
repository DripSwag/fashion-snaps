import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/homepage")) {
    const response = await fetch(
      "http://127.0.0.1:8000/api/authorization/" +
        request.cookies.get("sessionId")?.value
    );
    console.log(response.status);
    if (response.status !== 202) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (request.nextUrl.searchParams.get("postId") === null) {
    return NextResponse.redirect(new URL(request.nextUrl.origin, request.url));
  }
}

export const config = {
  matcher: "/homepage/:path?",
};
