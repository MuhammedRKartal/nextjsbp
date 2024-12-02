import type { Metadata } from "next";
import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getServerSession } from "next-auth";
import { Lato } from "next/font/google";
import ClientRoot from "@/app/client-root";
import SessionProvider from "@/components/Providers/SessionProvider";
import StoreProvider from "@/components/Providers/StoreProvider";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import MainRoot from "./main-root";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "https://nextbpk.netlify.app";

export const metadata: Metadata = {
  title: "WoW Tasker",
  description: "Revolutionize your botting experience with WoW Tasker!",
  metadataBase: new URL(NEXTAUTH_URL),
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
  openGraph: {
    title: "WoW Tasker",
    description: "Revolutionize your botting experience with WoW Tasker!",
    url: NEXTAUTH_URL,
    type: "website",
    siteName: "WoW Tasker",
    images: [
      {
        url: "/assets/company-logo-minimized.png",
        width: 400,
        height: 400,
      },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en" className={lato.className}>
      <body className="preload overflow-x-hidden bg-black dark:bg-white-bg text-white dark:text-black w-full">
        <MainRoot>
          <StoreProvider>
            <SessionProvider session={session}>
              <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                <ClientRoot>{children}</ClientRoot>
              </ThemeProvider>
            </SessionProvider>
          </StoreProvider>
        </MainRoot>
      </body>
    </html>
  );
}
