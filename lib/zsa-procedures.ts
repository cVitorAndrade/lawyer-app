import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerActionProcedure } from "zsa";

const authFetch = (token: string) => {
  return async (path: string, init?: RequestInit) => {
    return fetch(`${process.env.API_URL}${path}`, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
};

export const authenticatedProcedure = createServerActionProcedure().handler(
  async () => {
    const allCookies = await cookies();
    const access_token = allCookies.get("access_token")?.value;

    if (!access_token) redirect("/");

    return {
      fetch: authFetch(access_token),
    };
  }
);
