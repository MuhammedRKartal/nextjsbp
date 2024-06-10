import Breadcrumb from "@/components/breadcrumb";
import { ROUTES } from "@/routes";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
  description:
    "List of orders with status of waiting for order, waiting for payment, waiting for approval, completed and expired status",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbList = [
    { url: ROUTES.ACCOUNT, text: "Account" },
    { url: ROUTES.ORDERS, text: "Orders" },
  ];

  return (
    <div className="w-full">
      <Breadcrumb breadcrumbList={breadcrumbList} />
      {children}
    </div>
  );
}
