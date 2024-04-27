import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.DEPLOYMENT_URL}`),
  title: {
    default: "Résumé Wrangler",
    template: "%s | Résumé Wrangler",
  },
  description: "Résumé Wrangler",
  openGraph: {
    title: "Résumé Wrangler",
    description: "Online résumé customization tool",
    url: `${process.env.DEPLOYMENT_URL}`,
    siteName: "Résumé Wrangler",
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Résumé Wrangler",
    card: "summary_large_image",
  },
  verification: {
    // google: "",
    // yandex: "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* <div className="sr-only">Skip to main content</div> */}
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
