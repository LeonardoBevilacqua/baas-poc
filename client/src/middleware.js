import { NextResponse } from "next/server";

const AUTH_PAGES = ["/account"];

const isAuthPages = (url) => AUTH_PAGES.includes(url);

export async function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasToken = !!token;
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    const response = NextResponse.next();
    response.cookies.delete("token");
    return response;
  }

  if (!hasToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(new URL(`/account`, url));
    response.cookies.delete("token");

    return response;
  }

  return NextResponse.next();
}

export const config = { matcher: ["/account", "/"] };
