import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/homepage")) {
    const response = await fetch(
      process.env.API_ORIGIN +
        "/api/authorization/" +
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
