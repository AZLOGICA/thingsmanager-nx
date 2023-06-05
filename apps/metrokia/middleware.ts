import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 

// See "Matching Paths" below to learn more
export const config = {
    matcher:  [ '/((?!api|_next/static|_next/image|favicon.ico).*)' ],
  };


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const token = request.cookies.get("token");

  console.log("request", request)

  if (token === undefined && request.nextUrl.pathname !== "/auth/login" ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next()
}
 
