"use server";

import { cookies } from "next/headers";

export const getMeAction = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("User Not Logged In");
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });
  const result = res.json();
  console.log(result)
  return result;
};
