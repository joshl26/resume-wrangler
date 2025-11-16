// app/layout.tsx
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Suspense } from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import LandingNavBar from "./ui/landing/landing-navbar";
import LandingFooter from "./ui/landing/landing-footer";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read theme cookie on the server
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const htmlClass = themeCookie === "dark" ? "dark" : "";

  return (
    <html lang="en" className={htmlClass}>
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-2880932731702994"
        ></meta>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2880932731702994"
          crossOrigin="anonymous"
        ></script>
        <meta
          name="google-site-verification"
          content="rGWZTpkLfxRsz52svO1g0SqgULKbLNTrq7_5cGryCW0"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="sr-only">Skip to main content</div>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
