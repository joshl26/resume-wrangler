import type { Metadata } from "next";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/app/ui/blog/mdx";
import { getViewsCount } from "@/app/lib/blog/queries";
import { getBlogPosts } from "@/app/lib/blog/blog";
import ViewCounter from "../view-counter";
import { increment } from "@/app/lib/blog/actions";
import { unstable_noStore as noStore } from "next/cache";
import Landing from "@/app/landing/page";
import BackButton from "@/app/ui/back-button";

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? `${process.env.APP_DEPLOYMENT_URL}${image}`
    : `${process.env.APP_DEPLOYMENT_URL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${process.env.APP_DEPLOYMENT_URL}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function formatDate(date: string) {
  noStore();
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}

export default function Blog({ params }: { params: any }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Landing>
      <main className=" flex flex-col w-full min-h-[97vh] bg-purple-heart-200 px-3">
        <section className="max-w-screen-md tight-shadow w-full mx-auto text-azure-radiance-400 min-h-[97vh] pt-[10vh] bg-purple-heart-300 px-4">
          <BackButton
            classname="text-azure-radiance-900 hover:text-rose-500"
            href="/blog"
          >
            Back
          </BackButton>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.metadata.title,
                datePublished: post.metadata.publishedAt,
                dateModified: post.metadata.publishedAt,
                description: post.metadata.summary,
                image: post.metadata.image
                  ? `${process.env.APP_DEPLOYMENT_URL}${post.metadata.image}`
                  : `${process.env.APP_DEPLOYMENT_URL}/og?title=${post.metadata.title}`,
                url: `${process.env.APP_DEPLOYMENT_URL}/blog/${post.slug}`,
                author: {
                  "@type": "Person",
                  name: "Joshua Lehman",
                },
              }),
            }}
          />
          <h1 className="title font-medium text-2xl tracking-tighter text-white mt-6">
            {post.metadata.title}
          </h1>
          <div className="flex justify-between items-center mt-2 mb-8 text-sm ">
            <Suspense fallback={<p className="h-5" />}>
              <p className="text-sm text-azure-radiance-900">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </Suspense>
            <Suspense fallback={<p className="h-5" />}>
              <Views classname="text-azure-radiance-900" slug={post.slug} />
            </Suspense>
          </div>
          <article className="prose prose-quoteless prose-neutral dark:prose-invert ">
            <CustomMDX source={post.content} />
          </article>
        </section>
      </main>
    </Landing>
  );
}

let incrementViews = cache(increment);

async function Views({ slug, classname }: { slug: string; classname: string }) {
  let views = await getViewsCount();
  incrementViews(slug);
  return <ViewCounter classname={classname} allViews={views} slug={slug} />;
}