import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  try {
    const cookies = request.cookies;
    const token = cookies.get("token")?.value;
    const role = cookies.get("role")?.value;

    const isPrivateRoute =
      request.nextUrl.pathname.startsWith("/user") ||
      request.nextUrl.pathname.startsWith("/admin");

    // if the route is private and the user is not logged in, redirect to login page
    if (isPrivateRoute && !token) {
      return NextResponse.redirect(new URL("/?form=login", request.url));
    }

    if (!isPrivateRoute && token) {
      return NextResponse.redirect(new URL(`${role}/dashboard`, request.url));
    }
    
  } catch (error) {
    return NextResponse.redirect(new URL("/?form=login", request.url));
  }
}


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}