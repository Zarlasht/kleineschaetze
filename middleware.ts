import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userId = request.cookies.get("userid")?.value;

  if (request.nextUrl.pathname.startsWith("/dashboard") && !userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}



export const config = {
  matcher: ["/dashboard/:path*"], 
};
