"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/app/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { ITEMS_PER_PAGE } from "../lib/constants";

export default function Pagination({
  totalPages,
  totalCount,
}: {
  totalPages: number;
  totalCount: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  // Calculate showing range
  const startItem = currentPage === 1 ? 1 : offset + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalCount);

  return (
    <nav className="pagination-container" aria-label="Table navigation">
      <div className="pagination-info">
        Showing{" "}
        <span className="pagination-info-highlight">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="pagination-info-highlight">{totalCount}</span>
      </div>

      <div className="pagination-controls">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="pagination-numbers">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </nav>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx("pagination-number", {
    "pagination-number-first": position === "first" || position === "single",
    "pagination-number-last": position === "last" || position === "single",
    "pagination-number-active": isActive,
    "pagination-number-ellipsis": position === "middle",
  });

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx("pagination-arrow", {
    "pagination-arrow-disabled": isDisabled,
    "pagination-arrow-left": direction === "left",
    "pagination-arrow-right": direction === "right",
  });

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="pagination-arrow-icon" />
    ) : (
      <ArrowRightIcon className="pagination-arrow-icon" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
