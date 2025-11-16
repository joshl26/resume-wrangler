import { Metadata } from "next";
import RegisterUser from "@/app/ui/forms/register-user";
import BackButton from "@/app/ui/back-button";
import Link from "next/link";
import PurpleBlob from "@/app/ui/landing/purple-blob";
import AzureBlob from "@/app/ui/landing/azure-blob";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Breadcrumb from "@/app/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Sign Up for Resume Wrangler - Create Your Free Account",
  description:
    "Create your free Resume Wrangler account to build AI-powered, ATS-optimized resumes and cover letters. Start customizing your job applications today with our intelligent tools.",
  keywords: [
    "sign up",
    "create account",
    "register",
    "free account",
    "resume builder signup",
    "new user registration",
    "join resume wrangler"
  ],
  openGraph: {
    title: "Sign Up for Resume Wrangler - Start Building Better Resumes",
    description: "Create your free account and start building AI-powered resumes and cover letters that get you hired.",
    url: `${process.env.DEPLOYMENT_URL}/register/`,
    type: "website",
    images: [
      {
        url: "/og-register.png",
        width: 1200,
        height: 630,
        alt: "Sign Up for Resume Wrangler",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Sign Up for Resume Wrangler",
    description: "Create your free account and build better resumes with AI.",
  },
  robots: {
    index: false, 
    follow: true,
  },
  alternates: {
    canonical: `${process.env.DEPLOYMENT_URL}/register/`,
  },
};

function RegisterStructuredData() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sign Up for Resume Wrangler",
    "description": "User registration page for Resume Wrangler",
    "url": `${process.env.DEPLOYMENT_URL}/register/`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Resume Wrangler",
      "url": `${process.env.DEPLOYMENT_URL}/`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
    />
  );
}

export default async function RegisterPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Create Free Account", url: "/register/" },
  ];
  

  return (
    <>
      <RegisterStructuredData />
      <div className="register-page pt-20">
        <div className="register-container max-w-6xl mx-auto">
          {/* Decorative elements */}
          <PurpleBlob className="blob-purple" aria-hidden="true" />
          <AzureBlob className="blob-azure" aria-hidden="true" />
          <nav aria-label="Breadcrumb" className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </nav>


          <section aria-labelledby="register-heading" className="register-content">
            <div className="register-form-wrapper">
              <h1 id="register-heading" className="text-[2rem] font-bold text-center mb-6">
                Create Your Free Account
              </h1>

              <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
                Start building AI-powered resumes and cover letters in minutes
              </p>

              <RegisterUser />

              <nav aria-label="Account navigation" className="register-signup-link mt-4">
                <p className="register-signup-text text-center">
                  Already have an account?{" "}
                  <Link
                    className="register-signup-anchor text-rose-800 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 rounded font-semibold"
                    href="/auth/login"
                  >
                    Sign In
                  </Link>
                </p>
              </nav>

              

              {/* Trust indicators */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <ul className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 dark:text-slate-400" role="list">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Free forever plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>No credit card required</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Data encrypted & secure</span>
                  </li>
                </ul>
              </div>

              {/* Privacy notice */}
              <p className="mt-6 text-xs text-center text-slate-500 dark:text-slate-500">
                By signing up, you agree to our{" "}
                 <Link
                  href="/privacy-policy"
                  className="text-rose-800 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 rounded"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}<Link
                  href="/terms-of-service"
                  className="text-rose-800 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 rounded"
                >
                  Terms of Service
                </Link>{" "}
               
              </p>
              <nav aria-label="Page navigation" className="mt-6">
                <BackButton className="register-back-button" href="/">
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