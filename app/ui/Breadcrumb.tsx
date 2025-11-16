import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 container mx-auto">
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex items-center space-x-2 text-sm text-gray-400"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const key = item.url || item.name;

          return (
            <li
              key={key}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center"
              aria-current={isLast ? "page" : undefined}
            >
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-gray-500 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {item.url && !isLast ? (
                <Link
                  href={{ pathname: item.url }}
                  itemProp="item"
                  className="hover:text-amber-400 transition-colors duration-200"
                  rel="nofollow"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              ) : (
                <span itemProp="name" className="text-gray-300" tabIndex={-1}>
                  {item.name}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
