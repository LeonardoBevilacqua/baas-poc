import { NextResponse } from "next/server";
import { createClient } from "backend/infra/supabase/middleware";

const AUTH_PAGES = ["/account"];
const isAuthPages = (url) => AUTH_PAGES.includes(url);

export async function middleware(request) {
  // eslint-disable-next-line no-undef
  switch (process.env.NEXT_PUBLIC_BACKEND) {
  case "firebase":
    return await firebaseMiddleware(request);
  case "supabase":
    return await supabaseMiddleware(request);
  }
}

async function supabaseMiddleware(request) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { url, nextUrl } = request;
    const { supabase, response } = createClient(request, NextResponse.next);

    const isAuthPageRequested = isAuthPages(nextUrl.pathname);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session && !isAuthPageRequested) {
      return NextResponse.redirect(new URL("/account", url));
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

async function firebaseMiddleware(request) {
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

    const response = NextResponse.redirect(new URL("/account", url));
    response.cookies.delete("token");

    return response;
  }

  return NextResponse.next();
}

export const config = { matcher: ["/account", "/"] };
