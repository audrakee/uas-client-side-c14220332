import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user')?.value;
  const pathname = request.nextUrl.pathname;
  if ((pathname.startsWith('/dashboard')) && !user) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  return NextResponse.next();
}

// Jangan lupa tambahkan di next.config.js
// matcher: ['/dashboard/:path*']
