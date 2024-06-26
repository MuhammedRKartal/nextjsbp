"use client";

import { ROUTES } from "@/routes";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();
  signOut();
  router.push(ROUTES.LOGIN);
  return <></>;
}
