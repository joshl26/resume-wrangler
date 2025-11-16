// app/(wherever your page is)/page.tsx
import React from "react";
import { Metadata } from "next";
import ResumeTemplates from "@/app/ui/resume-templates/resume-templates";
import { fetchResumeTemplates } from "@/app/lib/data";
import PurpleBlob from "@/app/ui/landing/purple-blob";
import AzureBlob from "@/app/ui/landing/azure-blob";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "@/app/ui/Breadcrumb";

// Enhanced metadata
export const metadata: Metadata = {
  title:
    "Professional Resume Templates - ATS-Friendly & Customizable | Resume Wrangler",
  description:
    "Browse 50+ professional, ATS-friendly resume templates. Modern, creative, and minimal designs ready to customize. Free and premium templates for all industries and experience levels.",
  keywords: [
    "resume templates",
    "professional resume templates",
    "ATS-friendly templates",
    "modern resume templates",
    "creative resume templates",
    "free resume templates",
    "customizable resume templates",
    "resume design",
    "CV templates",
  ],
  openGraph: {
    title: "Professional Resume Templates - ATS-Friendly & Customizable",
    description:
      "Browse 50+ professional resume templates. Modern, creative, and minimal designs ready to customize for any industry.",
    url: `${process.env.DEPLOYMENT_URL}/resume-templates/`,
    type: "website",
    images: [
      {
        url: "/og-templates.png",
        width: 1200,
        height: 630,
        alt: "Resume Wrangler Professional Resume Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Resume Templates - Resume Wrangler",
    description:
      "Browse 50+ ATS-friendly resume templates. Free and customizable.",
    images: ["/twitter-templates.png"],
  },
  alternates: {
    canonical: `${process.env.DEPLOYMENT_URL}/resume-templates/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Resume Templates", url: "/resume-templates/" },
];

// JSON-LD Structured Data
function TemplatesStructuredData() {
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
        name: "Resume Templates",
        item: `${process.env.DEPLOYMENT_URL}/resume-templates/`,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Professional Resume Templates",
    description:
      "Browse professional, ATS-friendly resume templates for all industries",
    url: `${process.env.DEPLOYMENT_URL}/resume-templates/`,
    isPartOf: {
      "@type": "WebSite",
      name: "Resume Wrangler",
      url: `${process.env.DEPLOYMENT_URL}/`,
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Resume Wrangler Templates",
    description: "Professional resume templates with ATS optimization",
    brand: {
      "@type": "Brand",
      name: "Resume Wrangler",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I pick the right resume template?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pick a template that matches the role and industry you're applying for. Use a clean, readable layout for corporate jobs and a creative layout for design roles.",
        },
      },
      {
        "@type": "Question",
        name: "Can I edit a template after selecting it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — after you select a template you can edit all content: text, sections, and formatting. We save your progress automatically in your dashboard.",
        },
      },
      {
        "@type": "Question",
        name: "Are templates optimized for ATS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many of our templates are ATS-friendly. Look for templates labeled 'ATS-friendly' in the template details. Avoid excessive graphics and rely on clear headings and simple formatting for best results.",
        },
      },
      {
        "@type": "Question",
        name: "What file formats can I export?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can export your resume as PDF. In future releases we will add DOCX and plain text export options.",
        },
      },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

async function Page() {
  const resumeTemplates = await fetchResumeTemplates();
  const featured = resumeTemplates?.slice(0, 6) ?? [];

  const categories = [
    { id: "modern", label: "Modern" },
    { id: "professional", label: "Professional" },
    { id: "creative", label: "Creative" },
    { id: "minimal", label: "Minimal" },
  ];

  const faqs = [
    {
      q: "How do I pick the right template?",
      a: "Pick a template that matches the role and industry you're applying for. Use a clean, readable layout for corporate jobs and a creative layout for design roles.",
    },
    {
      q: "Can I edit a template after selecting it?",
      a: "Yes — after you select a template you can edit all content: text, sections, and formatting. We save your progress automatically in your dashboard.",
    },
    {
      q: "Are templates optimized for ATS?",
      a: "Many of our templates are ATS-friendly. Look for templates labeled 'ATS-friendly' in the template details. Avoid excessive graphics and rely on clear headings and simple formatting for best results.",
    },
    {
      q: "What file formats can I export?",
      a: "You can export your resume as PDF. In future releases we will add DOCX and plain text export options.",
    },
  ];

  return (
    <>
      <TemplatesStructuredData />
      <div className="login-page">
        <div className="login-container">
          <PurpleBlob className="blob-purple" aria-hidden="true" />
          <AzureBlob className="blob-azure" aria-hidden="true" />
          <div className="login-content">
            <div className="login-form-wrapper w-full max-w-6xl p-6 space-y-8">
              <nav aria-label="Breadcrumb">
                <Breadcrumb items={breadcrumbItems} />
              </nav>

              {/* HERO */}
              <header className="mx-auto w-full max-w-4xl text-center">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Professional Resume Templates, Ready to Customize
                </h1>
                <p className="mt-3 text-sm">
                  Browse, preview, and pick a template to jump-start your
                  resume. All templates are fully editable in the editor.
                </p>

                {/* Search (server-safe GET form — no client JS required) */}
                <form
                  role="search"
                  aria-label="Search resume templates"
                  className="mt-6 flex items-center gap-3 justify-center"
                  method="GET"
                >
                  <label htmlFor="template-search" className="sr-only">
                    Search templates
                  </label>
                  <input
                    id="template-search"
                    name="q"
                    type="search"
                    placeholder="Search templates by name, style or keyword"
                    className="w-full max-w-xl rounded-md border border-gray-200 px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    aria-describedby="search-description"
                  />
                  <span id="search-description" className="sr-only">
                    Search through our collection of professional resume
                    templates
                  </span>
                  <button
                    type="submit"
                    className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  >
                    Search
                  </button>
                </form>
              </header>

              {/* Categories */}
              <nav
                aria-label="Template categories"
                className="max-w-4xl mx-auto"
              >
                <h2 className="sr-only">Browse by Category</h2>
                <ul className="flex flex-wrap justify-center gap-3" role="list">
                  {categories.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`#${c.id}`}
                        className="inline-block rounded-full border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* How it works / Features */}
              <section
                aria-labelledby="how-it-works"
                className="max-w-4xl mx-auto"
              >
                <h2
                  id="how-it-works"
                  className="text-xl font-semibold mb-4 text-center"
                >
                  How It Works
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <article className="p-4 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-start gap-3">
                      <span
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-amber-100 text-amber-800"
                        aria-hidden="true"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Pick a Template
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Choose a layout that fits your industry and experience
                          level.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article className="p-4 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-start gap-3">
                      <span
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-amber-100 text-amber-800"
                        aria-hidden="true"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Customize
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Edit headings, reorder sections, and tailor content
                          for each job.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article className="p-4 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-start gap-3">
                      <span
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-amber-100 text-amber-800"
                        aria-hidden="true"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Export & Apply
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Download a PDF or keep the resume in your dashboard
                          for future edits.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </section>

              {/* Featured templates strip */}
              {featured.length > 0 && (
                <section
                  aria-labelledby="featured-templates"
                  className="max-w-7xl mx-auto"
                >
                  <h2
                    id="featured-templates"
                    className="text-lg font-semibold mb-4"
                  >
                    Featured Templates
                  </h2>

                  <div
                    className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4"
                    role="list"
                  >
                    {featured.map((t) => (
                      <article
                        key={t.id}
                        className="min-w-[220px] max-w-[220px] rounded-lg overflow-hidden border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm"
                      >
                        <Link
                          href={`/dashboard/resume/${t.id}`}
                          className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-lg"
                        >
                          <div className="aspect-7/9 relative">
                            <img
                              src={t.thumbnail_url}
                              alt={`${t.name} resume template preview`}
                              className="object-cover w-full h-full"
                              width={240}
                              height={310}
                              loading="lazy"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-semibold truncate text-gray-900 dark:text-white">
                              {t.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Preview Template
                            </p>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Templates grid (existing component) */}
              <section aria-labelledby="all-templates" className="w-full">
                <h2 id="all-templates" className="text-xl font-semibold mb-4">
                  All Templates
                </h2>
                <ResumeTemplates resumeTemplates={resumeTemplates} />
              </section>

              {/* CTA */}
              <section
                aria-labelledby="cta-heading"
                className="max-w-3xl mx-auto text-center mt-8"
              >
                <div className="p-6 rounded-lg border text-gray-600 dark:text-gray-300 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                  <h2
                    id="cta-heading"
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    Found a Template You Like?
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Create an account to save templates, edit them online, and
                    export polished PDFs.
                  </p>
                  <nav
                    aria-label="Account actions"
                    className="mt-4 flex justify-center gap-3"
                  >
                    <Link
                      href="/register"
                      className="rounded-md bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                    >
                      Sign Up — It's Free
                    </Link>
                    <Link
                      href="/auth/login"
                      className="rounded-md border text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    >
                      Sign In
                    </Link>
                  </nav>
                </div>
              </section>

              {/* FAQ */}
              <section
                aria-labelledby="faq-heading"
                className="max-w-4xl mx-auto mt-8"
              >
                <h2
                  id="faq-heading"
                  className="text-xl font-semibold mb-4 text-center"
                >
                  Frequently Asked Questions
                </h2>

                <div className="space-y-3">
                  {faqs.map((f, idx) => (
                    <details
                      key={idx}
                      className="group rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-4"
                    >
                      <summary className="cursor-pointer list-none text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded">
                        {f.q}
                        <span
                          className="ml-2 text-gray-500 group-open:rotate-180 transition-transform inline-block"
                          aria-hidden="true"
                        >
                          ▼
                        </span>
                      </summary>

                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                        {f.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Small footer note */}
              <footer className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
                <p>
                  Templates are provided as a starting point. Customize content
                  to fit your experience and the role you're applying for.
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
