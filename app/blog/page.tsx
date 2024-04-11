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
      <main className="h-full min-h-[97vh] bg-orange-100">
        <section className="flex flex-col max-w-screen-md mx-auto pt-[10vh] px-4">
          <div className="flex flex-row w-full justify-start pb-8">
            <BackButton
              classname="text-azure-radiance-700 font-medium hover:text-rose-500"
              href="/"
            >
              Back
            </BackButton>
          </div>
          <h1 className="text-azure-radiance-700 font-bold text-3xl mb-8 tracking-tighter">
            Resume Wrangler Blog
          </h1>
          <h2 className="text-azure-radiance-700 font-lite mb-8 text-[1.25rem] tracking-tighter">
            A great place to stay up to date with the latest feature releases,
            tutorials and news regarding the Resume Wrangler.
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
                  <p className="text-purple-heart-4d00 font-medium tracking-tight">
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

  return <ViewCounter classname="text-rose-500" allViews={views} slug={slug} />;
}
