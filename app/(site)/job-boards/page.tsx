// app/(your-route)/job-boards/page.tsx
import JobBoards from "@/app/ui/job-boards/JobBoards";
import Link from "next/link";

export const metadata = {
  title: "Job Boards",
  description: "Search through several job boards for postings",
};

interface PageProps {
  searchParams?: {
    q?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  const initialQuery = searchParams?.q || "";

  return (
    // added job-boards-page class so page-scoped CSS targets only this page
    <main className="min-h-screen job-boards-page ">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Page header / hero */}
        <header className="mb-8">
          {/* keep Tailwind sizing/spacing, but let color come from job-boards CSS */}
          <h1 className="text-3xl font-extrabold leading-tight job-boards-title">
            Job Boards — Search multiple job sites at once
          </h1>
          <p className="mt-2 text-sm max-w-2xl job-boards-subtitle">
            Enter a job title or keywords and open tailored searches on several
            popular job boards. Great for quick market research and application
            discovery.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/resume"
              className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Browse resume templates
            </Link>

            <a
              href="#tips"
              className="text-sm underline-offset-2 hover:underline job-boards-subtitle"
            >
              Search tips
            </a>
          </div>
        </header>

        {/* Main content column */}
        <section aria-labelledby="jobboards-section" className="space-y-8">
          <div id="jobboards-section" className="sr-only">
            Job boards search tools
          </div>

          {/* JobBoards component (client) */}
          <div className="rounded-lg">
            <JobBoards initialQuery={initialQuery} />
          </div>

          {/* Tips and accessibility notes */}
          <aside
            id="tips"
            className="rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <h2 className="mb-2 text-base font-semibold">Search tips</h2>
            <ul className="list-inside list-disc space-y-1">
              <li>
                Try variations of a title (e.g., "Frontend Engineer" / "React
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
            </ul>

            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Note: links open in a new tab and are constructed using the
              selected job board's search URL.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
