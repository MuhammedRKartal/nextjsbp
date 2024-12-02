"use client";

import clsx from "clsx";
import { Button } from "@/components/button";
import { Image } from "@/components/image";
import { Section } from "@/components/section";
import Footer from "@/views/footer";
import Header from "@/views/header";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <html lang="en">
      <body className="preload overflow-x-hidden bg-black dark:bg-white-bg">
        <Header />
        <main className={clsx("flex items-center my-6 mx-auto min-h-[64vh]", "md:my-10 md:mt-15")}>
          <Section
            className={clsx("relative mx-auto my-10", "md:my-20")}
            tag="div"
            appearance="thin"
          >
            <div
              className={clsx(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "flex flex-col items-center justify-center gap-4 w-full"
              )}
            >
              <Image
                src={"/assets/company-logo-minimized.png"}
                alt="Company Logo"
                height={70}
                width={70}
                aspectRatio={1}
              ></Image>
              <h1 className="text-2xl ">Something went wrong!</h1>
              <span className=" capitalize">{error.message}</span>
              <a href="/">
                <Button appearance="filled">Return Home</Button>
              </a>
            </div>
          </Section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
