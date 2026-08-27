import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtUtilis } from "./utility/jwt";
import { cookies } from "next/headers";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTE = ["/login", "/register"];
const PUBLIC_ROUTE = ["/", "/news", "/projects", "/login", "/register"];

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const cookieStore = await cookies();
  let accessToken = await request.cookies.get("accessToken")?.value;
  const refreshToken = await request.cookies.get("refreshToken")?.value;
  let decodedAccessToken = accessToken
    ? jwtUtilis.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SCERET as string,
      )
    : null;
  const decodedRefreshToken = refreshToken
    ? jwtUtilis.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SCERET as string,
      )
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();
    if (result.success) {
      const newAccessToken = result.data.accessToken;
      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;
      decodedAccessToken = accessToken!
    ? jwtUtilis.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SCERET as string,
      )
    : null;
    }
  }

  let userRole = null;
  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken");
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && AUTH_ROUTE.includes(pathName)) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublic = PUBLIC_ROUTE.some(
    (route) => pathName === route || pathName.startsWith(route + "/"),
  );
  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathName.startsWith("/dashboard") && userRole !== "USER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathName.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathName.startsWith("/author-dashboard") &&
    userRole !== "AUTHOR"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  // [
  //     "/dashboard/:path*",
  //     "/author-dashboard/:path*",
  //     "/admin-dashboard/:path*",
  //   ],
};
