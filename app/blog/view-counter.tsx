import clsx from "clsx";

export default function ViewCounter({
  slug,
  allViews,
  classname,
}: {
  slug: string;
  allViews: {
    slug: string;
    count: number;
  }[];
  trackView?: boolean;
  classname: string;
}) {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug);
  const number = new Number(viewsForSlug?.count || 0);
  return (
    <p className={clsx("", classname)}>{`${number.toLocaleString()} views`}</p>
  );
}
