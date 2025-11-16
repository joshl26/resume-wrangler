// description: Landing page for the Resume Wrangler website
// file: app/(site)/page.tsx

import { Metadata } from "next";
import LandingOne from "../ui/landing/landing-section-one";
// import LandingTwo from "../ui/landing/landing-section-two";
import LandingThree from "../ui/landing/landing-section-three";
import LandingFour from "../ui/landing/landing-section-four";

// Enhanced metadata for the homepage
export const metadata: Metadata = {
  title: "Resume Wrangler - AI-Powered Resume & Cover Letter Builder | Free Tool",
  description:
    "Tame your job search in seconds with Resume Wrangler. Create ATS-friendly resumes and tailored cover letters using AI. Sign up and try it FREE - no credit card required.",
  keywords: [
    "free resume builder",
    "AI resume generator",
    "cover letter builder",
    "ATS resume scanner",
    "job application tool",
    "resume templates",
    "professional resume maker",
    "career tools free",
    "resume customization",
    "job search optimization"
  ],
  openGraph: {
    title: "Resume Wrangler - AI-Powered Resume & Cover Letter Builder",
    description: "Tame your job search in seconds. Create ATS-friendly resumes and tailored cover letters with AI. Try it FREE!",
    url: `${process.env.DEPLOYMENT_URL}/`,
    siteName: "Resume Wrangler",
    images: [
      {
        url: "/og-homepage.png",
        width: 1200,
        height: 630,
        alt: "Resume Wrangler - Transform your job search with AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Wrangler - AI Resume Builder | Free Tool",
    description: "Tame your job search in seconds. Create ATS-friendly resumes with AI. Try FREE!",
    images: ["/twitter-homepage.png"],
    creator: "@resumewrangler",
  },
  alternates: {
    canonical: `${process.env.DEPLOYMENT_URL}/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data for Homepage
function HomeStructuredData() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${process.env.DEPLOYMENT_URL}/`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Resume Wrangler?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Resume Wrangler is an AI-powered tool that helps job seekers create tailored resumes and cover letters. It uses advanced algorithms to match your experience with job requirements and includes an ATS scanner to optimize your applications."
        }
      },
      {
        "@type": "Question",
        "name": "Is Resume Wrangler free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Resume Wrangler offers a free Basic plan that allows you to create customized resumes and cover letters. We also offer a Pro plan with additional features like enhanced templates and increased download limits."
        }
      },
      {
        "@type": "Question",
        "name": "What is an ATS scanner?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An ATS (Applicant Tracking System) scanner is a tool that checks if your resume is optimized for automated screening systems used by employers. Resume Wrangler includes an in-house ATS scanner to help ensure your resume gets past these initial filters."
        }
      },
      {
        "@type": "Question",
        "name": "How does the AI customization work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Resume Wrangler uses advanced algorithms to analyze job descriptions and match them with your professional information. It automatically highlights relevant experiences, skills, and achievements to create tailored application materials for each job posting."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Create a Resume with Resume Wrangler",
    "description": "Step-by-step guide to creating an optimized resume using Resume Wrangler",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Sign Up",
        "text": "Create a free account on Resume Wrangler",
        "url": `${process.env.DEPLOYMENT_URL}/register/`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Input Your Information",
        "text": "Enter your professional information, experience, education, and skills",
        "url": `${process.env.DEPLOYMENT_URL}/dashboard/`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Add Job Description",
        "text": "Paste the job description you're applying for",
        "url": `${process.env.DEPLOYMENT_URL}/dashboard/`
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Generate & Download",
        "text": "Let AI customize your resume and download it as a professional PDF",
        "url": `${process.env.DEPLOYMENT_URL}/dashboard/`
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Resume Wrangler",
    "description": "AI-powered resume and cover letter builder with ATS optimization",
    "brand": {
      "@type": "Brand",
      "name": "Resume Wrangler"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "TBD",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "offerCount": "2"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}

export default async function Page() {
  return (
    <>
      <HomeStructuredData />
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="sr-only">
          Resume Wrangler - AI-Powered Resume and Cover Letter Builder
        </h1>
        <LandingOne />
      </section>
      
      {/* <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          Key Features
        </h2>
        <LandingTwo />
      </section> */}
      
      <section aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="sr-only">
          Benefits and How It Works
        </h2>
        <LandingThree />
      </section>
      
      <section aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="sr-only">
          Get Started with Resume Wrangler
        </h2>
        <LandingFour />
      </section>
    </>
  );
}