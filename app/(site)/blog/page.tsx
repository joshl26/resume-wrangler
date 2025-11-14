// app/blog/page.tsx (streaming-friendly)
import Link from "next/link";
import { Suspense } from "react";
import ViewCounter from "./view-counter"; // keep as client component
import { getBlogPosts } from "@/app/lib/blog/blog";
import BackButton from "@/app/ui/back-button";
import { ViewsSkeleton } from "@/app/ui/skeletons";

export const metadata = {
  title: "Blog",
  description: "Stay up to date with our newest features by reading our blog.",
};

export default async function BlogPage() {
  // only fetch the list of posts here (fast)
  const allBlogs = await getBlogPosts();

  const sorted = allBlogs.sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
      ? -1
      : 1,
  );

  return (
    <main>
      <section className="h-full min-h-[97vh] bg-amber-200">
        <section className="flex flex-col max-w-(--breakpoint-md) min-h-[97vh] mx-auto bg-amber-300 pt-[10vh] px-4 tight-shadow">
          <div className="flex flex-row w-full justify-start pb-8">
            <BackButton
              className="text-azure-radiance-700 font-medium hover:text-rose-700"
              href="/"
            >
              Back
            </BackButton>
          </div>

          <h1 className="text-black font-bold text-3xl mb-8 tracking-tighter">
            Resume Wrangler Blog
          </h1>

          <h2 className="text-black font-lite mb-8 text-[1.25rem] tracking-tighter">
            A great place to stay up to date with the latest feature releases,
            tutorials and news regarding the Resume Wrangler.
          </h2>

          {sorted.map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="text-azure-radiance-800 font-medium tracking-tight">
                  {post.metadata.title}
                </p>

                {/* Stream view count per-post */}
                <Suspense fallback={<ViewsSkeleton />}>
                  {/* Views is an async server component (see below) that fetches only this post's views */}
                  <Views slug={post.slug} />
                </Suspense>
              </div>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}

// Views is an async server component that streams independently
async function Views({ slug }: { slug: string }) {
  // fetch views for this slug only; server fetch will stream when ready
  const { getViewsCount } = await import("@/app/lib/blog/queries"); // lazy import OK
  const views = await getViewsCount();
  // ViewCounter is a client component that can accept the server-provided count
  return <ViewCounter className="text-rose-700" allViews={views} slug={slug} />;
}
