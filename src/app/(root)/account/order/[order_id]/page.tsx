"use server";

import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";
import { PageProps } from "@/types";
import { cookies } from "next/headers";

export default async function OrderPage() {
  const cookie = cookies();

  const refresh_token = cookie.get("refresh_token");

  if (!refresh_token) {
    redirect(ROUTES.LOGIN);
  }

  return <></>;
}
