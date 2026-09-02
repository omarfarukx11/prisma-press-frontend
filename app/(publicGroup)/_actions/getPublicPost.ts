"use server"
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken"

export const getPublicNews = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Authentication token missing. Please log in.",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store", 
  });

  const result = await res.json();
  return result;
};