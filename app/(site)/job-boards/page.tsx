// app/(your-route)/job-boards/page.tsx
import { Metadata } from "next";
import Breadcrumb from "@/app/ui/Breadcrumb";
import JobBoards from "@/app/ui/job-boards/JobBoards";
import Link from "next/link";

// Enhanced metadata
export const metadata: Metadata = {
  title: "Job Board Search Tool - Search Multiple Sites at Once | Resume Wrangler",
  description:
    "Search multiple job boards simultaneously with Resume Wrangler's job search tool. Find opportunities on LinkedIn, Indeed, Glassdoor, and more from one place. Save time in your job hunt.",
  keywords: [
    "job board search",
    "multi-site job search",
    "job search tool",
    "indeed search",
    "linkedin jobs",
    "glassdoor search",
    "job aggregator",
    "job hunt tools",
    "employment search",
    "career opportunities"
  ],
  openGraph: {
    title: "Job Board Search - Search Multiple Sites at Once",
    description: "Search multiple job boards simultaneously. Find opportunities on LinkedIn, Indeed, Glassdoor, and more from one place.",
    url: `${process.env.DEPLOYMENT_URL}/job-boards/`,
    type: "website",
    images: [
      {
        url: "/og-jobboards.png",
        width: 1200,
        height: 630,
        alt: "Resume Wrangler Job Board Search Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Board Search - Find Jobs Faster",
    description: "Search multiple job boards at once. LinkedIn, Indeed, Glassdoor, and more.",
    images: ["/twitter-jobboards.png"],
  },
  alternates: {
    canonical: `${process.env.DEPLOYMENT_URL}/job-boards/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface PageProps {
  searchParams?: {
    q?: string;
  };
}

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Search Jobs", url: "/job-boards/" },
];

// JSON-LD Structured Data for Job Boards Page
function JobBoardsStructuredData() {
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
        "name": "Search Jobs",
        "item": `${process.env.DEPLOYMENT_URL}/job-boards/`
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Job Board Search Tool",
    "description": "Search multiple job boards simultaneously to find employment opportunities",
    "url": `${process.env.DEPLOYMENT_URL}/job-boards/`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${process.env.DEPLOYMENT_URL}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Search Jobs"
        }
      ]
    }
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Job Board Multi-Search Tool",
    "description": "Search multiple job boards at once including LinkedIn, Indeed, Glassdoor, and more",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "url": `${process.env.DEPLOYMENT_URL}/job-boards/`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Multi-site job search",
      "LinkedIn integration",
      "Indeed search",
      "Glassdoor search",
      "Quick search links",
      "Location-based filtering"
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Search Multiple Job Boards at Once",
    "description": "Use Resume Wrangler's tool to search multiple job sites simultaneously",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Enter Keywords",
        "text": "Type in your job title or keywords (e.g., 'Frontend Engineer', 'Marketing Manager')"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Select Job Boards",
        "text": "Choose which job boards you want to search (LinkedIn, Indeed, Glassdoor, etc.)"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Search All Sites",
        "text": "Click to open searches on all selected job boards in new tabs"
      }
    ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}

export default function Page({ searchParams }: PageProps) {
  const initialQuery = searchParams?.q || "";

  return (
    <>
      <JobBoardsStructuredData />
      {/* added job-boards-page class so page-scoped CSS targets only this page */}
      <div className="min-h-screen job-boards-page">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </nav>

          {/* Page header / hero */}
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold leading-tight job-boards-title">
              Search Multiple Job Sites at Once
            </h1>
            <p className="mt-2 text-sm max-w-2xl job-boards-subtitle">
              Enter a job title or keywords and open tailored searches on several
              popular job boards. Great for quick market research and application
              discovery.
            </p>

            <nav aria-label="Quick actions" className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard/resume"
                className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
              >
                Browse Resume Templates
              </Link>

              <a
                href="#tips"
                className="text-sm underline-offset-2 hover:underline job-boards-subtitle focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded"
              >
                Search Tips
              </a>
            </nav>
          </header>

          {/* Main content column */}
          <section aria-labelledby="jobboards-heading" className="space-y-8">
            <h2 id="jobboards-heading" className="sr-only">
              Job Board Search Tools
            </h2>

            {/* JobBoards component (client) */}
            <div className="rounded-lg">
              <JobBoards initialQuery={initialQuery} />
            </div>

            {/* Tips and accessibility notes */}
            <aside
              id="tips"
              aria-labelledby="tips-heading"
              className="rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <h2 id="tips-heading" className="mb-2 text-base font-semibold">
                Search Tips
              </h2>
              <ul className="list-inside list-disc space-y-1" role="list">
                <li>
                  Try variations of a title (e.g., "Frontend Engineer" or "React
                  Developer").
                </li>
                <li>
                  Include location or remote if you want geo-filtered results
                  (e.g., "Toronto remote").
                </li>
                <li>
                  Use short keywords — most job boards will interpret multiple
                  terms well.
                </li>
                <li>
                  Add specific skills or technologies to narrow your search
                  (e.g., "Python developer AWS").
                </li>
              </ul>

              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                <strong>Note:</strong> Links open in a new tab and are constructed using each
                job board's search URL. This tool helps you search faster by opening
                multiple sites at once.
              </p>
            </aside>
          </section>

          {/* Additional SEO content */}
          <section aria-labelledby="about-tool-heading" className="mt-12 rounded-md border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
            <h2 id="about-tool-heading" className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              Why Use Our Multi-Search Tool?
            </h2>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>Save Time:</strong> Instead of visiting multiple job sites separately,
                search them all at once with a single query.
              </p>
              <p>
                <strong>Comprehensive Results:</strong> Access opportunities from LinkedIn,
                Indeed, Glassdoor, Monster, and other major job boards simultaneously.
              </p>
              <p>
                <strong>Better Coverage:</strong> Different sites list different jobs. Searching
                multiple platforms ensures you don't miss opportunities.
              </p>
              <p>
                <strong>Market Research:</strong> Compare listings across platforms to understand
                salary ranges, requirements, and market demand for your skills.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}