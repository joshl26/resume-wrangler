// app/about/page.tsx
import { Metadata } from "next";
import BackButton from "@/app/ui/back-button";
import Link from "next/link";
import {
  Heart,
  Target,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Award,
  Globe,
  Briefcase,
  FileText,
  Sparkles,
} from "lucide-react";
import Breadcrumb from "@/app/ui/Breadcrumb";

// Enhanced metadata
export const metadata: Metadata = {
  title: "About Resume Wrangler - Our Mission to Revolutionize Job Applications",
  description:
    "Learn about Resume Wrangler's AI-powered resume and cover letter builder. Discover our mission, vision, technology stack, and how we help job seekers land their dream jobs with ATS-optimized applications.",
  keywords: [
    "about resume wrangler",
    "AI resume builder company",
    "job application tools",
    "ATS scanner technology",
    "career tools mission",
    "resume builder story",
    "AI-powered job search",
    "professional resume service"
  ],
  openGraph: {
    title: "About Resume Wrangler - Revolutionizing Job Applications with AI",
    description: "Discover how Resume Wrangler uses AI to help job seekers create ATS-optimized resumes and cover letters. Learn about our mission, technology, and impact.",
    url: `${process.env.DEPLOYMENT_URL}/about/`,
    type: "website",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "About Resume Wrangler - Our Mission and Vision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Resume Wrangler - AI-Powered Career Tools",
    description: "Learn about our mission to revolutionize job applications with AI technology.",
    images: ["/twitter-about.png"],
  },
  alternates: {
    canonical: `${process.env.DEPLOYMENT_URL}/about/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about/" },
];

// JSON-LD Structured Data for About Page
function AboutStructuredData() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${process.env.DEPLOYMENT_URL}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": `${process.env.DEPLOYMENT_URL}/about/`
      }
    ]
  };

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Resume Wrangler",
    "description": "Learn about Resume Wrangler's mission to revolutionize job applications with AI-powered tools",
    "url": `${process.env.DEPLOYMENT_URL}/about/`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Resume Wrangler",
      "description": "AI-powered resume and cover letter customization tool",
      "foundingDate": "2024", // Update with actual date
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "1-10"
      }
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Resume Wrangler AI Resume Builder",
    "description": "AI-powered resume and cover letter customization service with ATS optimization",
    "provider": {
      "@type": "Organization",
      "name": "Resume Wrangler"
    },
    "serviceType": "Career Services",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Resume Wrangler Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Basic Plan",
            "description": "Free resume and cover letter customization"
          },
          "price": "0",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pro Plan",
            "description": "Premium features with enhanced templates and unlimited downloads"
          },
          "price": "TBD",
          "priceCurrency": "USD"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250",
      "bestRating": "5"
    }
  };

  const techStackSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": "Resume Wrangler",
    "programmingLanguage": ["TypeScript", "JavaScript", "React"],
    "runtimePlatform": "Next.js",
    "codeRepository": "https://github.com/joshl26/resume-wrangler/"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techStackSchema) }}
      />
    </>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutStructuredData />
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-violet-50 to-fuchsia-50 dark:from-slate-900 dark:via-violet-950 dark:to-fuchsia-950">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </nav>

          {/* Header */}
          <header className="text-center mb-16">
            <div className="flex justify-center mb-4" aria-hidden="true">
              <Briefcase className="w-16 h-16 text-violet-600 dark:text-violet-400" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
              About Resume Wrangler
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Revolutionizing how job seekers prepare their application materials
              with AI-powered customization.
            </p>
          </header>

          {/* Introduction Section */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              <p>
                Resume Wrangler is a dynamic and innovative resume and cover
                letter customization tool aimed at revolutionizing how job seekers
                prepare their application materials. This web application provides
                an intuitive platform where users can input their professional
                information and automatically generate tailored resumes and cover
                letters based on specific job descriptions.
              </p>
              <p>
                We take pride in our Artificial Intelligence (AI)-powered software
                that scans resumes using an in-house ATS scanner. Additionally, we
                leverage open-source language grammar and spell checking to
                further enhance our software's accuracy.
              </p>
              <p>
                Our platform simplifies the application process and significantly
                enhances the relevance and appeal of application documents to
                prospective employers. We parse user data and align it seamlessly
                with the qualifications sought by employers, incorporating smart
                algorithms that highlight the most relevant experiences, skills,
                and achievements.
              </p>
            </div>
          </article>

          {/* Mission & Vision */}
          <section aria-labelledby="mission-vision-heading" className="mb-12">
            <h2 id="mission-vision-heading" className="sr-only">
              Our Mission and Vision
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <article className="bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-10 h-10" aria-hidden="true" />
                  <h3 className="text-3xl font-bold">Our Mission</h3>
                </div>
                <p className="text-lg leading-relaxed text-violet-50">
                  To empower job seekers with innovative AI-powered tools that
                  create tailored, professional application materials, helping them
                  stand out in competitive job markets and land their dream
                  positions.
                </p>
              </article>

              <article className="bg-linear-to-br from-fuchsia-500 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-10 h-10" aria-hidden="true" />
                  <h3 className="text-3xl font-bold">Our Vision</h3>
                </div>
                <p className="text-lg leading-relaxed text-fuchsia-50">
                  A future where every job seeker has access to sophisticated,
                  AI-driven career tools that level the playing field and make
                  professional success accessible to all.
                </p>
              </article>
            </div>
          </section>

          {/* Key Features */}
          <section aria-labelledby="features-heading" className="mb-12">
            <h2 id="features-heading" className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
              What Makes Us Different
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <article className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                  <Zap className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  AI-Powered Customization
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Complex matching algorithms that emphasize relevant details for
                  each job posting.
                </p>
              </article>

              <article className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                  <FileText className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  In-House ATS Scanner
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Ensure your resume passes Applicant Tracking Systems with our
                  proprietary scanner.
                </p>
              </article>

              <article className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                  <Globe className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Job Board Integration
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Direct integration with popular hiring platforms for accurate
                  document tailoring.
                </p>
              </article>

              <article className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                  <Users className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  User-Friendly Interface
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Clean, responsive design with simple navigation for effortless
                  document creation.
                </p>
              </article>

              <article className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                  <Shield className="w-7 h-7 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Data Security
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Advanced security protocols with encrypted storage to protect
                  your personal data.
                </p>
              </article>

              <article className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                  <Award className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Professional Templates
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Access to a wide range of pre-made resume and cover letter
                  templates.
                </p>
              </article>
            </div>
          </section>

          {/* Membership Tiers */}
          <section aria-labelledby="pricing-heading" className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 id="pricing-heading" className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
              Membership Options
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <article className="border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center" aria-hidden="true">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Basic (Free)
                  </h3>
                </div>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-1" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      Explore the platform and create customized materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-1" aria-hidden="true">
                      ✓
                    </span>
                    <span>Access to basic resume and cover letter templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-1" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      Standard PDF downloads (limited to 5 per day in future)
                    </span>
                  </li>
                </ul>
              </article>

              <article className="border-2 border-violet-500 dark:border-violet-400 rounded-xl p-6 bg-linear-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950 dark:to-fuchsia-950">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center" aria-hidden="true">
                    <Award className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Pro
                  </h3>
                </div>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-600 dark:text-violet-400 mt-1" aria-hidden="true">
                      ✓
                    </span>
                    <span>Up to 100 full-color PDF downloads per day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-600 dark:text-violet-400 mt-1" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      Vector graphics with clickable links and custom colors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-600 dark:text-violet-400 mt-1" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      Access to premium templates and user image uploads
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-600 dark:text-violet-400 mt-1" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      Priority support and advanced customization options
                    </span>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* Tech Stack */}
          <section aria-labelledby="tech-heading" className="bg-linear-to-r from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 id="tech-heading" className="text-3xl font-bold text-white text-center mb-8">
              Built With Modern Technology
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Frontend</h3>
                <p className="text-slate-300">
                  React 19, Next.js 16, TypeScript, Tailwind CSS
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Backend</h3>
                <p className="text-slate-300">
                  Next.js API Routes, Node.js, PostgreSQL
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Testing & Deployment</h3>
                <p className="text-slate-300">
                  Jest, Playwright, Vercel, CI/CD with GitHub Actions
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section aria-labelledby="stats-heading" className="bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 id="stats-heading" className="text-3xl font-bold text-white text-center mb-8">
              Our Impact
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2" aria-hidden="true">
                  <TrendingUp className="w-8 h-8 text-violet-200" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">10K+</div>
                <div className="text-violet-200">Resumes Generated</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2" aria-hidden="true">
                  <Users className="w-8 h-8 text-violet-200" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">5K+</div>
                <div className="text-violet-200">Active Users</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2" aria-hidden="true">
                  <Award className="w-8 h-8 text-violet-200" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">98%</div>
                <div className="text-violet-200">ATS Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2" aria-hidden="true">
                  <Globe className="w-8 h-8 text-violet-200" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">24/7</div>
                <div className="text-violet-200">Support</div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section aria-labelledby="cta-heading" className="bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 id="cta-heading" className="text-3xl font-bold mb-4">
              Ready to Transform Your Job Search?
            </h2>
            <p className="text-xl text-violet-100 mb-6 max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully landed their
              dream jobs with Resume Wrangler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-violet-600 hover:bg-violet-50 font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started Free
              </Link>
              <Link
                href="/contact"
                className="bg-violet-800 hover:bg-violet-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </section>

          {/* Back Button */}
          <nav className="mt-8">
            <BackButton className="text-slate-600 dark:text-slate-300" href="/">
              Back to Home
            </BackButton>
          </nav>
        </div>
      </div>
    </>
  );
}