"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";

export default async function OrderPage() {
  const cookie = cookies();

  const access_token = cookie.get("access_token");

  if (!access_token) {
    redirect(ROUTES.LOGIN);
  }

  return <></>;
}
