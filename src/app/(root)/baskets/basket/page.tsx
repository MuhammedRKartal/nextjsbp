import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignOut from "@/components/Utility/SignOut";
import { ROUTES } from "@/routes";
import Basket from "@/views/basket";

export default async function BasketPage() {
  const session = await getServerSession();
  const cookie = cookies();

  if (!session?.user) {
    redirect(ROUTES.LOGIN);
  }
  if (!cookie.get("refresh_token")?.value) {
    return <SignOut />;
  }

  return <Basket />;
}
