import Link from "next/link";
import { Suspense } from "react";
import ViewCounter from "./view-counter";
import { getViewsCount } from "@/app/lib/blog/queries";
import { getBlogPosts } from "@/app/lib/blog/blog";
import LandingFooter from "../ui/landing/landing-footer";
import LandingNavBar from "../ui/landing/landing-navbar";
import BackButton from "../ui/back-button";
import Landing from "../landing/page";

export const metadata = {
  title: "Blog",
  description: "Stay up to date with our newest features by reading our blog.",
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <Landing>
      {" "}
      <main className="h-full min-h-[97vh] bg-azure-radiance-600">
        <section className="flex flex-col max-w-screen-md mx-auto pt-20">
          <div className="flex justify-start">
            <BackButton href="/">Back</BackButton>{" "}
          </div>
          <h1 className="font-medium text-2xl mb-8 tracking-tighter">
            Resume Wrangler Blog
          </h1>
          <h2 className="font-medium mb-8 tracking-tighter">
            A place to stay up to date with new feature releases and news
            regarding the Resume Wrangler
          </h2>

          {allBlogs
            .sort((a, b) => {
              if (
                new Date(a.metadata.publishedAt) >
                new Date(b.metadata.publishedAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((post) => (
              <Link
                key={post.slug}
                className="flex flex-col space-y-1 mb-4"
                href={`/blog/${post.slug}`}
              >
                <div className="w-full flex flex-col">
                  <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                    {post.metadata.title}
                  </p>
                  <Suspense fallback={<p className="h-6" />}>
                    <Views slug={post.slug} />
                  </Suspense>
                </div>
              </Link>
            ))}
        </section>
      </main>
    </Landing>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();

  return <ViewCounter allViews={views} slug={slug} />;
}
