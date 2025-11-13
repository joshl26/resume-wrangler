/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/skeletons.test.tsx
 *
 * Tests for skeleton components used during loading states.
 */

import React from "react";
import { render } from "@testing-library/react";

// DashboardSkeleton is the default export; the rest are named exports
import DashboardSkeleton, {
  CardSkeleton,
  CardsSkeleton,
  RevenueChartSkeleton,
  InvoiceSkeleton,
  LatestInvoicesSkeleton,
  TableRowSkeleton,
  InvoicesMobileSkeleton,
  InvoicesTableSkeleton,
  ViewsSkeleton,
  CardCountsSkeleton,
  ApplicationsTableSkeleton,
} from "../skeletons";

describe("Skeleton Components", () => {
  it("CardSkeleton renders with shimmer and core elements", () => {
    const { container } = render(<CardSkeleton />);
    const root = container.firstElementChild as HTMLElement | null;
    expect(root).toBeTruthy();
    expect(root).toHaveClass("relative", "overflow-hidden");
    expect(
      container.querySelector(".rounded-md.bg-gray-200"),
    ).toBeInTheDocument();
  });

  it("CardsSkeleton renders four CardSkeletons (top-level children)", () => {
    const { container } = render(<CardsSkeleton />);
    // CardsSkeleton returns a fragment with 4 CardSkeleton top-level nodes.
    // Count element children of the container to get the number of CardSkeleton roots.
    const elementChildren = Array.from(container.children).filter(
      (n) => n.nodeType === Node.ELEMENT_NODE,
    );
    expect(elementChildren.length).toBe(4);
  });

  it("RevenueChartSkeleton renders chart area and legend", () => {
    const { container } = render(<RevenueChartSkeleton />);
    const root = container.firstElementChild as HTMLElement | null;
    expect(root).toBeTruthy();
    const gridArea = container.querySelector('[class*="h-[410px]"]');
    expect(gridArea).toBeInTheDocument();
    const legend = container.querySelector(".h-5.w-5.rounded-full");
    expect(legend).toBeInTheDocument();
  });

  it("InvoiceSkeleton renders customer info and amount placeholders", () => {
    const { container } = render(<InvoiceSkeleton />);
    expect(
      container.querySelector(".h-8.w-8.rounded-full"),
    ).toBeInTheDocument();
    expect(container.querySelector(".h-5.w-40.rounded-md")).toBeInTheDocument();
    expect(container.querySelector(".h-4.w-12.rounded-md")).toBeInTheDocument();
  });

  it("LatestInvoicesSkeleton renders header and list of invoices", () => {
    const { container } = render(<LatestInvoicesSkeleton />);
    expect(container.querySelector(".h-8.w-36.rounded-md")).toBeInTheDocument();
    // Look for at least one invoice row placeholder
    const invoiceRows = container.querySelectorAll("div[class*='border-b']");
    expect(invoiceRows.length).toBeGreaterThanOrEqual(1);
  });

  it("DashboardSkeleton renders the main dashboard pieces", () => {
    const { container } = render(<DashboardSkeleton />);
    expect(container.querySelector(".h-8.w-36")).toBeInTheDocument();
    const cardRoots = container.querySelectorAll('[class*="rounded-xl"]');
    expect(cardRoots.length).toBeGreaterThanOrEqual(4);
    const headers = container.querySelectorAll(".h-8.w-36");
    expect(headers.length).toBeGreaterThanOrEqual(2);
  });

  it("TableRowSkeleton renders all table cell placeholders", () => {
    const { container } = render(<TableRowSkeleton />);
    expect(
      container.querySelector("td .flex.items-center"),
    ).toBeInTheDocument();
    const textPlaceholders = container.querySelectorAll("td .h-6");
    expect(textPlaceholders.length).toBeGreaterThanOrEqual(4);
    const actions = container.querySelectorAll('[class*="h-[38px]"]');
    expect(actions.length).toBeGreaterThanOrEqual(2);
  });

  it("InvoicesMobileSkeleton renders mobile invoice layout", () => {
    const { container } = render(<InvoicesMobileSkeleton />);
    expect(
      container.querySelector("div.flex.items-center"),
    ).toBeInTheDocument();
    expect(container.querySelector("div.flex.w-full")).toBeInTheDocument();
  });

  it("InvoicesTableSkeleton renders desktop table and mobile skeletons", () => {
    const { container } = render(<InvoicesTableSkeleton />);
    expect(container.querySelector("table")).toBeInTheDocument();
    const mobileItems = container.querySelectorAll("div.mb-2.w-full");
    expect(mobileItems.length).toBeGreaterThanOrEqual(1);
    const tableRows = container.querySelectorAll("tbody > tr");
    expect(tableRows.length).toBeGreaterThanOrEqual(1);
  });

  it("ViewsSkeleton renders a small animated placeholder", () => {
    const { container } = render(<ViewsSkeleton />);
    const el = container.firstElementChild as HTMLElement | null;
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass(
      "h-6",
      "w-16",
      "bg-gray-200",
      "rounded",
      "animate-pulse",
    );
  });

  it("CardCountsSkeleton renders four animated card placeholders", () => {
    const { container } = render(<CardCountsSkeleton />);
    const cards = container.querySelectorAll("div.animate-pulse");
    expect(cards.length).toBeGreaterThanOrEqual(4);
    cards.forEach((card) => {
      expect(card.querySelector(".h-6")).toBeTruthy();
      expect(card.querySelector(".h-10")).toBeTruthy();
    });
  });

  it("ApplicationsTableSkeleton renders header and six row placeholders", () => {
    const { container } = render(<ApplicationsTableSkeleton />);
    const headers = Array.from(container.querySelectorAll(".h-6"));
    const header = headers.find(
      (h) =>
        h.className.split(/\s+/).includes("w-1/3") ||
        h.className.includes("w-1/3"),
    );
    expect(header).toBeInTheDocument();
    const rows = container.querySelectorAll("div.flex.items-center");
    expect(rows.length).toBeGreaterThanOrEqual(6);
  });
});
