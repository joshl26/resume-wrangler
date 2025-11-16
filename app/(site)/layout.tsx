// app/(site)/layout.tsx
import React from "react";
import { Metadata } from "next";
import LandingNavBar from "@/app/ui/landing/landing-navbar";
import LandingFooter from "@/app/ui/landing/landing-footer";

// Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.DEPLOYMENT_URL}/`),
  title: {
    default: "Resume Wrangler - AI-Powered Resume & Cover Letter Builder",
    template: "%s | Resume Wrangler",
  },
  description:
    "Create tailored resumes and cover letters with AI-powered customization. Resume Wrangler helps job seekers optimize their applications with ATS-friendly templates and smart algorithms.",
  keywords: [
    "resume builder",
    "cover letter generator",
    "ATS scanner",
    "job application",
    "AI resume",
    "career tools",
    "resume templates",
    "professional resume",
    "resume customization",
    "job search tools",
  ],
  authors: [{ name: "Resume Wrangler Team" }],
  creator: "Resume Wrangler",
  publisher: "Resume Wrangler",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${process.env.DEPLOYMENT_URL}/`,
    title: "Resume Wrangler - AI-Powered Resume & Cover Letter Builder",
    description:
      "Create tailored resumes and cover letters with AI-powered customization. Optimize your job applications with ATS-friendly templates.",
    siteName: "Resume Wrangler",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Wrangler - AI Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Wrangler - AI-Powered Resume & Cover Letter Builder",
    description:
      "Create tailored resumes and cover letters with AI-powered customization.",
    images: ["/twitter-image.png"],
    creator: "@resumewrangler",
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
  verification: {
    google: "your-google-verification-code", // Add your verification codes
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: `${process.env.DEPLOYMENT_URL}/`,
  },
  category: "technology",
};

// JSON-LD Structured Data Component
function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Resume Wrangler",
    description:
      "AI-powered resume and cover letter customization tool for job seekers",
    url: `${process.env.DEPLOYMENT_URL}/`,
    logo: `${process.env.DEPLOYMENT_URL}/logo.png`,
    sameAs: [
      "https://github.com/joshl26/resume-wrangler",
      "https://www.linkedin.com/in/joshrlehman/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "joshlehman.dev@gmail.com",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Resume Wrangler",
    url: `${process.env.DEPLOYMENT_URL}/`,
    description:
      "Create tailored resumes and cover letters with AI-powered customization",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.DEPLOYMENT_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Resume Wrangler",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        name: "Basic Plan",
        description:
          "Free membership with customized cover letters and resumes",
      },
      {
        "@type": "Offer",
        price: "TBD",
        priceCurrency: "USD",
        name: "Pro Plan",
        description:
          "Premium features with enhanced templates and download limits",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joshua R. Lehman",
    jobTitle: "Software Developer & Founder",
    url: `${process.env.DEPLOYMENT_URL}/about/`,
    sameAs: [
      "https://github.com/joshl26/",
      "https://www.linkedin.com/in/joshrlehman/",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Resume Wrangler",
    },
    description:
      "Creator of Resume Wrangler, an AI-powered resume and cover letter customization tool",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "McMaster University",
    },
    knowsAbout: [
      "Software Development",
      "React",
      "Next.js",
      "AI/ML",
      "Full Stack Development",
      "Resume Optimization",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData />
      <div className="overflow-x-hidden min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <header role="banner">
          <LandingNavBar />
        </header>
        <main id="main-content" role="main" className="flex-1">
          {children}
        </main>
        <footer role="contentinfo">
          <LandingFooter />
        </footer>
      </div>
    </>
  );
}
