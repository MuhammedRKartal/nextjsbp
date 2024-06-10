import { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import { ROUTES } from "@/routes";

export const metadata: Metadata = {
  title: "Notification Settings",
  description:
    "How would you like to be informed about our campaigns? Change your notification settings.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbList = [
    { url: ROUTES.ACCOUNT, text: "Account" },
    { url: ROUTES.NOTIFICATION_SETTINGS, text: "Notification Settings" },
  ];

  return (
    <div className="w-full">
      <Breadcrumb breadcrumbList={breadcrumbList} />
      {children}
    </div>
  );
}
