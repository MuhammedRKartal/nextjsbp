"use server";

import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignOut from "@/components/Utility/SignOut";
import Register from "@/views/register";

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
  return <Register />;
}
