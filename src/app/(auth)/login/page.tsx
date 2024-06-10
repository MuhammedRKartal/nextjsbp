"use server";

import Login from "@/views/login";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import SignOut from "@/components/Utility/SignOut";

export default async function Auth({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getServerSession();
  const refresh_token = cookies().get("refresh_token");

  if (session?.user && !refresh_token?.value) {
    return <SignOut />;
  }

  if (session?.user) {
    const callback = searchParams?.callbackUrl;

    redirect(callback ?? "/");
  }
  return <Login />;
}
