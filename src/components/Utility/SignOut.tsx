"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";

export default function SignOut() {
  const router = useRouter();
  signOut();
  router.push(ROUTES.LOGIN);
  return <></>;
}
