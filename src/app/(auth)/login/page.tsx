"use server";

import Login from "@/views/login";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export default async function Auth({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getServerSession();

  if (session?.user) {
    const callback = searchParams?.callbackUrl;

    redirect(callback ?? "/");
  }
  return <Login />;
}
