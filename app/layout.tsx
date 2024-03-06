import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import StoreProvider from "./store/StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
