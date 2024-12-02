import { Metadata } from "next";
import { Section } from "@/components/section";
import { AccountMenu } from "@/views/account/account-menu";

export const metadata: Metadata = {
  title: "My Account",
  description: "Account Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Section className="flex flex-col gap-5 items-start md:flex-row">
      <AccountMenu className="hidden md:block" />
      {children}
    </Section>
  );
}
