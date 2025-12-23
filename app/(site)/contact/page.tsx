// app/contact/page.tsx
import { Metadata } from "next";
import ContactSection from "@/app/ui/sections/ContactSection";

// Enhanced metadata
export const metadata: Metadata = {
  title: "Contact Resume Wrangler - Get Support & Send Feedback",
  description:
    "Contact Resume Wrangler for support, feature requests, or partnership opportunities. Reach our team via email, GitHub, or LinkedIn. We respond within 24-48 hours.",
  keywords: [
    "contact resume wrangler",
    "resume builder support",
    "customer service",
    "technical support",
    "feature request",
    "partnership opportunities",
    "bug report",
    "help center",
  ],
  openGraph: {
    title: "Contact Resume Wrangler - Get Support & Send Feedback",
    description:
      "Get in touch with Resume Wrangler. We're here to help with support, feature requests, and partnership opportunities.",
    url: `${process.env.DEPLOYMENT_URL}/contact/`,
    type: "website",
    images: [
      {
        url: "/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact Resume Wrangler Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Resume Wrangler Support",
    description: "Get help from our team. We respond within 24-48 hours.",
    images: ["/twitter-contact.png"],
  },
  alternates: {
    canonical: `${process.env.DEPLOYMENT_URL}/contact/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Contact", url: "/contact/" },
];

// JSON-LD Structured Data for Contact Page
function ContactStructuredData() {
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
        name: "Contact",
        item: `${process.env.DEPLOYMENT_URL}/contact/`,
      },
    ],
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Resume Wrangler",
    description: "Contact page for Resume Wrangler support and inquiries",
    url: `${process.env.DEPLOYMENT_URL}/contact/`,
    mainEntity: {
      "@type": "Organization",
      name: "Resume Wrangler",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "support@resumewrangler.com",
          availableLanguage: "English",
          areaServed: "Worldwide",
        },
        {
          "@type": "ContactPoint",
          contactType: "Technical Support",
          email: "support@resumewrangler.com",
          availableLanguage: "English",
        },
      ],
      url: `${process.env.DEPLOYMENT_URL}/`,
      sameAs: [
        "https://github.com/joshl26/resume-wrangler/",
        "https://www.linkedin.com/in/joshrlehman/",
      ],
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contact Resume Wrangler",
    description:
      "Get in touch with Resume Wrangler for support, feedback, and partnership opportunities",
    url: `${process.env.DEPLOYMENT_URL}/contact/`,
    breadcrumb: {
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
          name: "Contact",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}

export default function ContactPage() {
  return (
    <div>
      <ContactStructuredData />
      <ContactSection />
    </div>
  );
}
