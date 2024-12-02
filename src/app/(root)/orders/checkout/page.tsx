import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Checkout from "@/views/checkout";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getServerSession();

  if (!session?.user?.name) {
    const callback = searchParams?.callbackUrl;

    redirect(callback ?? "/");
  }
  return <Checkout />;
}
