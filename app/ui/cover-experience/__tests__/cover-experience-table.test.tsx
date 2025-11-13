/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/cover-experience.test.tsx
 *
 * Tests for the CoverExperience component
 *
 * - Mocks next/link to render a plain anchor
 * - Mocks deleteCoverExperience action so imports don't run real logic
 * - Verifies rows render for provided cover experiences
 * - Verifies edit links include coverExperience id and user id
 * - Verifies the form contains hidden inputs with expected values and a Remove button
 * - Verifies empty state renders a link to create a new work experience
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// Mock next/link to render a simple anchor element
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

// Mock the deleteCoverExperience action so the module import is stable
const mockDeleteCoverExperience = jest.fn().mockResolvedValue({ ok: true });
jest.mock("@/app/lib/actions", () => ({
  deleteCoverExperience: (...args: any[]) => mockDeleteCoverExperience(...args),
}));

// Import the component after setting up mocks
import CoverExperience from "../cover-experience-table";

describe("CoverExperience", () => {
  const user = { id: "user123" } as any;

  const coverExperiences = [
    {
      id: "exp1",
      title: "Title 1",
      description: "Desc 1",
    },
    {
      id: "exp2",
      title: "Title 2",
      description: "Desc 2",
    },
  ] as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders table rows for each cover experience and shows headings", () => {
    const { container } = render(
      <CoverExperience coverExperiences={coverExperiences} user={user} />,
    );

    // Headings present
    expect(screen.getByText("Experience Name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();

    // Titles and descriptions
    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Desc 1")).toBeInTheDocument();
    expect(screen.getByText("Title 2")).toBeInTheDocument();
    expect(screen.getByText("Desc 2")).toBeInTheDocument();

    // There should be a row per experience (check number of Edit links)
    const editLinks = screen.getAllByText("Edit");
    expect(editLinks.length).toBe(2);

    // Verify hrefs include cover experience id and user id
    expect(editLinks[0]).toHaveAttribute(
      "href",
      `/dashboard/cover-experience/edit/exp1/${user.id}`,
    );
    expect(editLinks[1]).toHaveAttribute(
      "href",
      `/dashboard/cover-experience/edit/exp2/${user.id}`,
    );

    // Remove buttons present
    const removeButtons = screen.getAllByText("Remove");
    expect(removeButtons.length).toBe(2);

    // For each remove button, ensure its form has hidden inputs with correct values
    removeButtons.forEach((btn, idx) => {
      const form = btn.closest("form");
      expect(form).toBeTruthy();

      // cover_experience_id input
      const coverInput = form!.querySelector<HTMLInputElement>(
        'input[name="cover_experience_id"]',
      );
      expect(coverInput).toBeTruthy();
      expect(coverInput!.value).toBe(coverExperiences[idx].id);

      // user_id input
      const userInput = form!.querySelector<HTMLInputElement>(
        'input[name="user_id"]',
      );
      expect(userInput).toBeTruthy();
      expect(userInput!.value).toBe(user.id);
    });

    // Canvas: ensure the table itself exists
    const table = container.querySelector("table");
    expect(table).toBeInTheDocument();
  });

  it("renders empty state with link to create a new work experience when no experiences", () => {
    render(<CoverExperience coverExperiences={[]} user={user} />);

    const createLink = screen.getByRole("link", {
      name: /Start by creating your first work experience/i,
    });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute(
      "href",
      "/dashboard/work-experience/new",
    );
  });

  it("keeps rendering N/A when title or description is missing", () => {
    const missing = [{ id: "exp3", title: "", description: "" }] as any;

    render(<CoverExperience coverExperiences={missing} user={user} />);

    // Expect two N/A occurrences: one for the title link and one for the description cell
    const naElements = screen.getAllByText("N/A");
    expect(naElements).toHaveLength(2);

    // Ensure one of them is the link (title) and one is a table cell (description)
    expect(screen.getByRole("link", { name: "N/A" })).toBeInTheDocument();
    expect(naElements.some((el) => el.tagName.toLowerCase() === "td")).toBe(
      true,
    );

    // Remove button still present
    expect(screen.getByText("Remove")).toBeInTheDocument();
  });
  // Note: the form's action uses a server/client action (handleDelete)
  // which won't be invoked by a normal DOM submit in this test environment.
  // We therefore verify form structure/inputs and don't trigger the server action here.
  // If you want to integration-test the action, you can unit-test deleteCoverExperience directly.
});
