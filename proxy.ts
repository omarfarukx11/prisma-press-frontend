import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"


const AUTH_ROUTE = ["/login" , "/register"]
const PUBLIC_ROUTE = ["/" , "/news" , "/projects" ,"/login" , "/register"]

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const accessToken = await request.cookies.get("accessToken")?.value;
  const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null;

  let userRole = null;
  if(decodedToken) {
    userRole = decodedToken.role;
  }

  if(accessToken && AUTH_ROUTE.includes(pathName)) {
    if(userRole === "USER") {
        return NextResponse.redirect(new URL("/dashboard" , request.url))
    }else if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin-dashboard" , request.url))
    }else if(userRole === "AUTHOR") {
        return NextResponse.redirect(new URL("/author-dashboard" , request.url))
    }else {
         return NextResponse.redirect(new URL("/" , request.url))
    }
  }

  const isPublic = PUBLIC_ROUTE.some((route) => pathName === route || pathName.startsWith(route + "/"))
  if(!accessToken && !isPublic) {
    return NextResponse.redirect(new URL("/login" , request.url))
  }

  if(pathName.startsWith("/dashboard" ) && userRole !== "USER") {
    return NextResponse.redirect(new URL("/not-found" , request.url))
  }else if(pathName.startsWith("/admin-dashboard" ) && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found" , request.url))
  }else if((pathName.startsWith("/author-dashboard" ) && userRole !== "AUTHOR")) {
    return NextResponse.redirect(new URL("/not-found" , request.url))
  }

 return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)'
// [
//     "/dashboard/:path*",
//     "/author-dashboard/:path*",
//     "/admin-dashboard/:path*",
//   ], 
  

};
