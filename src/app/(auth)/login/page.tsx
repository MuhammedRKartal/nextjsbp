"use server";

import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignOut from "@/components/Utility/SignOut";
import Login from "@/views/login";

export default async function Auth({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getServerSession();
  const access_token = cookies().get("access_token");

  if (session?.user && !access_token?.value) {
    return <SignOut />;
  }

  if (session?.user) {
    const callback = searchParams?.callbackUrl;

    redirect(callback ?? "/");
  }
  return <Login />;
}
