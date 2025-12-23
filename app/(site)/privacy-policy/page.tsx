// app/privacy-policy/page.tsx
import { Metadata } from "next";
import PrivacySection from "@/app/ui/sections/PrivacySection";

// Enhanced metadata
export const metadata: Metadata = {
  title: "Privacy Policy - Resume Wrangler Data Protection & Security",
  description:
    "Resume Wrangler's privacy policy explains how we collect, use, and protect your personal and professional information. We are committed to data security with encryption, secure storage, and no selling of your data.",
  keywords: [
    "privacy policy",
    "data protection",
    "GDPR compliance",
    "data security",
    "personal information",
    "privacy rights",
    "data encryption",
    "information security",
  ],
  openGraph: {
    title: "Privacy Policy - Resume Wrangler",
    description:
      "Learn how Resume Wrangler protects your personal and professional information with industry-leading security measures.",
    url: `${process.env.DEPLOYMENT_URL}/privacy-policy/`,
    type: "website",
    images: [
      {
        url: "/og-privacy.png",
        width: 1200,
        height: 630,
        alt: "Resume Wrangler Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - Resume Wrangler",
    description: "Your privacy is our priority. See how we protect your data.",
  },
  alternates: {
    canonical: `${process.env.DEPLOYMENT_URL}/privacy-policy/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Privacy Policy", url: "/privacy-policy/" },
];

// JSON-LD Structured Data for Privacy Policy Page
function PrivacyStructuredData() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${process.env.DEPLOYMENT_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: `${process.env.DEPLOYMENT_URL}/privacy-policy/`,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "Resume Wrangler's privacy policy and data protection practices",
    url: `${process.env.DEPLOYMENT_URL}/privacy-policy/`,
    datePublished: "2025-11-14",
    dateModified: "2025-11-14",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Resume Wrangler",
      url: `${process.env.DEPLOYMENT_URL}/`,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Resume Wrangler",
    url: `${process.env.DEPLOYMENT_URL}/`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@resumewrangler.com",
      contactType: "Privacy Inquiries",
      availableLanguage: "English",
    },
    privacyPolicy: `${process.env.DEPLOYMENT_URL}/privacy-policy/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}

export default function PrivacyPage() {
  return (
    <div>
      <PrivacyStructuredData />
      {/* <PrivacySection /> */}
      <p className="mt-6 text-center text-gray-600 dark:text-blue-400">
        Privacy Policy content is under construction. Please check back later.
      </p>
    </div>
  );
}
