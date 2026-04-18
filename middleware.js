import { NextResponse } from "next/server";

const COOKIE_NAME = "tribute_admin_session";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  // Server Actions (Approve / Reject) use POST. If the session cookie is not
  // visible to middleware on that request (some proxies / hosting setups),
  // redirecting here caused 307 → /admin/login before the action ran.
  // Let POST through; actions still enforce auth via isAdminSessionValid().
  if (request.method === "POST") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
