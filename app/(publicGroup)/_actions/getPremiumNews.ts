"use server"
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken"
import { URLSearchParams } from "url";

export const getPremiumNews = async ({query} : {query?: {[key : string]: string | string[] | undefined}}) => {

  // const searchTerm = `${search?.searchTerm ? `?searchTerm=${search.searchTerm}` : "" } `

  const params = new URLSearchParams()
  if(query && query.searchTerm) {
    params.set("searchTerm" , query.searchTerm as string)
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;


  if (!accessToken) {
    return {
      success: false,
      message: "Authentication token missing. Please log in.",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/premium?${params.toString()}`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store", 
  });

  const result = await res.json();
  return result;
};