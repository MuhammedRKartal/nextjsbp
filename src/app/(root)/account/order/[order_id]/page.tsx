"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";

export default async function OrderPage() {
  const cookie = cookies();

  const refresh_token = cookie.get("refresh_token");

  if (!refresh_token) {
    redirect(ROUTES.LOGIN);
  }

  return <></>;
}
