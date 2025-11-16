// app/auth/login/page.tsx
import { Metadata } from "next";
import LoginForm from "@/app/ui/forms/login";
import BackButton from "@/app/ui/back-button";
import Link from "next/link";
import PurpleBlob from "@/app/ui/landing/purple-blob";
import AzureBlob from "@/app/ui/landing/azure-blob";

// Enhanced metadata
export const metadata: Metadata = {
  title: "Login to Resume Wrangler - Access Your Account",
  description:
    "Login to your Resume Wrangler account to create tailored resumes and cover letters. Access your saved templates, job applications, and professional documents.",
  keywords: [
    "resume wrangler login",
    "sign in",
    "account access",
    "user login",
    "resume builder login",
    "member access",
  ],
  openGraph: {
    title: "Login to Resume Wrangler",
    description:
      "Access your Resume Wrangler account to create and manage your professional resumes and cover letters.",
    url: `${process.env.DEPLOYMENT_URL}/auth/login`,
    type: "website",
    images: [
      {
        url: "/og-login.png",
        width: 1200,
        height: 630,
        alt: "Login to Resume Wrangler",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Login to Resume Wrangler",
    description:
      "Access your account to create tailored resumes and cover letters.",
  },
  robots: {
    index: false, // Don't index login pages
    follow: true,
  },
  alternates: {
    canonical: `${process.env.DEPLOYMENT_URL}/auth/login`,
  },
};

// JSON-LD Structured Data for Login Page
function LoginStructuredData() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Login to Resume Wrangler",
    description: "User login page for Resume Wrangler",
    url: `${process.env.DEPLOYMENT_URL}/auth/login/`,
    isPartOf: {
      "@type": "WebSite",
      name: "Resume Wrangler",
      url: `${process.env.DEPLOYMENT_URL}/`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
    />
  );
}

export default function LoginPage() {
  return (
    <>
      <LoginStructuredData />
      <div className="login-page">
        <div className="login-container">
          {/* Decorative elements */}
          <PurpleBlob className="blob-purple" aria-hidden="true" />
          <AzureBlob className="blob-azure" aria-hidden="true" />

          <section aria-labelledby="login-heading" className="login-content">
            <h1 id="login-heading" className="sr-only">
              Login to Resume Wrangler
            </h1>

            <div className="login-form-wrapper">
              <LoginForm />

              <nav
                aria-label="Account navigation"
                className="login-signup-link"
              >
                <p className="login-signup-text">
                  New user?{" "}
                  <Link
                    className="login-signup-anchor text-rose-800 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 rounded"
                    href="/register"
                  >
                    Sign Up
                  </Link>
                </p>
              </nav>

              <nav aria-label="Page navigation" className="mt-4">
                <BackButton className="login-back-button" href="/">
                  Back to Home
                </BackButton>
              </nav>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
