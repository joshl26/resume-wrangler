import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import StoreProvider from "./store/StoreProvider";
import { Suspense } from "react";
import AcmeLogo from "./ui/acme-logo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* <StoreProvider> */}
        <Suspense>{children}</Suspense>
        {/* </StoreProvider> */}
      </body>
    </html>
  );
}
