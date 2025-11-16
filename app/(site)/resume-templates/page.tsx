// app/(wherever your page is)/page.tsx
import React from "react";
import ResumeTemplates from "@/app/ui/resume-templates/resume-templates";
import { fetchResumeTemplates } from "@/app/lib/data";
import PurpleBlob from "@/app/ui/landing/purple-blob";
import AzureBlob from "@/app/ui/landing/azure-blob";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "@/app/ui/Breadcrumb";

export const metadata = {
  title: "Resume Templates",
  description: "Search through our resume templates",
};

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

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Resume Templates", url: "/resume-templates/" },
  ];

  return (
    <main className="login-page">
      <div className="login-container">
        <PurpleBlob className="blob-purple" />
        <AzureBlob className="blob-azure" />
        <section className="login-content">
          <div className="login-form-wrapper w-full max-w-6xl p-6 space-y-8">
            <nav aria-label="Breadcrumb">
              <Breadcrumb items={breadcrumbItems} />
            </nav>

            {/* HERO */}
            <header className="mx-auto w-full max-w-4xl text-center">
              <h1 className="text-3xl md:text-4xl font-bold">
                Professional resume templates, ready to customize
              </h1>
              <p className="mt-3 text-sm ">
                Browse, preview, and pick a template to jump-start your resume.
                All templates are fully editable in the editor.
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
                  className="w-full max-w-xl rounded-md border border-gray-200 px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-2 focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-600"
                >
                  Search
                </button>
              </form>
            </header>

            {/* Categories */}
            <nav aria-label="Template categories" className="max-w-4xl mx-auto">
              <ul className="flex flex-wrap justify-center gap-3">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`#${c.id}`}
                      className="inline-block rounded-full border border-gray-200 px-3 py-1 text-sm  hover:bg-gray-50 dark:border-gray-700 "
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
                How it works
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-amber-100 text-amber-800">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-600 dark:text-gray-300">
                        Pick a template
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Choose a layout that fits your industry and experience
                        level.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-amber-100 text-amber-800">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-600 dark:text-gray-300">
                        Customize
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Edit headings, reorder sections, and tailor content for
                        each job.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-amber-100 text-amber-800">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-600 dark:text-gray-300">
                        Export & apply
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Download a PDF or keep the resume in your dashboard for
                        future edits.
                      </p>
                    </div>
                  </div>
                </div>
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
                  Featured templates
                </h2>

                <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4">
                  {featured.map((t) => (
                    <div
                      key={t.id}
                      className="min-w-[220px] max-w-[220px] rounded-lg overflow-hidden border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm"
                    >
                      <Link
                        href={`/dashboard/resume/${t.id}`}
                        className="block h-full"
                      >
                        <div className="aspect-7/9 relative">
                          <img
                            src={t.thumbnail_url}
                            alt={t.name}
                            className="object-cover w-full h-full"
                            width={240}
                            height={310}
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-semibold truncate text-gray-900 dark:text-white">
                            {t.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                            Preview
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Templates grid (existing component) */}
            <section aria-labelledby="all-templates" className="w-full">
              <h2 id="all-templates" className="text-xl font-semibold mb-4">
                All templates
              </h2>
              <ResumeTemplates resumeTemplates={resumeTemplates} />
            </section>

            {/* CTA */}
            <section className="max-w-3xl mx-auto text-center mt-8">
              <div className="p-6 rounded-lg border text-gray-600 dark:text-gray-300 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-lg font-semibold">
                  Found a template you like?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Create an account to save templates, edit them online, and
                  export polished PDFs.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <Link
                    href="/register"
                    className="rounded-md bg-amber-500 px-4 py-2 font-semibold text-black"
                  >
                    Sign up — it's free
                  </Link>
                  <Link
                    href="/login"
                    className="rounded-md border text-gray-600 dark:text-gray-300 border-gray-300 px-4 py-2 text-sm"
                  >
                    Sign in
                  </Link>
                </div>
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
                Frequently asked questions
              </h2>

              <div className="space-y-3">
                {faqs.map((f, idx) => (
                  <details
                    key={idx}
                    className="group rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-4"
                  >
                    <summary className="cursor-pointer list-none text-sm font-medium text-gray-900 dark:text-white">
                      {f.q}
                      <span className="ml-2 text-gray-500 group-open:rotate-180 transition-transform inline-block">
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
                Templates are provided as a starting point. Customize content to
                fit your experience and the role you’re applying for.
              </p>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Page;
