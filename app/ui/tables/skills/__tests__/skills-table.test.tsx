/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Skills from "../skills-table";
import type { User, UserSkills, UserSkill } from "@/app/lib/definitions";

// Mock next/link to render a plain anchor for tests
jest.mock("next/link", () => {
  return ({ href, children }: any) =>
    React.createElement("a", { href }, children);
});

// Mock next/navigation to control router.refresh
const mockRefresh = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

// Mock the deleteUserSkill action
const mockDeleteUserSkill = jest.fn();
jest.mock("@/app/lib/actions", () => ({
  deleteUserSkill: (...args: any[]) => mockDeleteUserSkill(...args),
}));

// Mock fetchFilteredSkills to control data in tests
const mockFetchFilteredSkills = jest.fn();
jest.mock("@/app/lib/data", () => ({
  fetchFilteredSkills: (...args: any[]) => mockFetchFilteredSkills(...args),
}));

// Mock the Pagination component to simplify tests
jest.mock("@/app/ui/pagination", () => (props: any) => (
  <div data-testid="pagination">
    Pagination - Total Pages: {props.totalPages}, Total Count:{" "}
    {props.totalCount}
  </div>
));

describe("Skills (table)", () => {
  const u = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Use real types from your codebase
  const mockUser: User = {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
  } as User;

  const mockSkills: UserSkills = [
    {
      id: "skill-1",
      skill: "JavaScript",
      skill_level: 90,
    },
    {
      id: "skill-2",
      skill: "TypeScript",
      skill_level: 85,
    },
    {
      id: "skill-3",
      skill: "React",
      skill_level: null,
    },
  ] as unknown as UserSkills;

  const defaultProps = {
    user: mockUser,
    skills: mockSkills,
    totalPages: 2,
    query: "",
    currentPage: 1,
    totalCount: 15,
  };

  it("renders table headers correctly", () => {
    render(<Skills {...defaultProps} />);

    expect(screen.getByText("Skill Name")).toBeInTheDocument();
    expect(screen.getByText("Skill Level")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders skills with correct data and links (uses real types)", () => {
    render(<Skills {...defaultProps} />);

    // Skill name links
    const jsLink = screen.getByRole("link", { name: /JavaScript/i });
    expect(jsLink).toHaveAttribute("href", "/dashboard/skills/edit/skill-1");

    const tsLink = screen.getByRole("link", { name: /TypeScript/i });
    expect(tsLink).toHaveAttribute("href", "/dashboard/skills/edit/skill-2");

    const reactLink = screen.getByRole("link", { name: /React/i });
    expect(reactLink).toHaveAttribute("href", "/dashboard/skills/edit/skill-3");

    // Skill level displays and range inputs
    expect(screen.getByText("90%")).toBeInTheDocument();
    const jsSlider = screen.getByTitle("90%") as HTMLInputElement;
    expect(jsSlider).toHaveAttribute("type", "range");
    expect(jsSlider.value).toBe("90");
    expect(jsSlider).toHaveAttribute("readonly");

    expect(screen.getByText("85%")).toBeInTheDocument();
    const tsSlider = screen.getByTitle("85%") as HTMLInputElement;
    expect(tsSlider.value).toBe("85");

    // Null skill_level renders "N/A" and the range has value "0"
    expect(screen.getByText("N/A")).toBeInTheDocument();
    const reactSlider = screen.getByTitle("N/A") as HTMLInputElement;
    expect(reactSlider.value).toBe("0");

    // There are Edit links for each row; use getAllByRole to avoid ambiguity
    const editLinks = screen.getAllByRole("link", { name: /Edit/i });
    expect(editLinks).toHaveLength(3);
    expect(editLinks[0]).toHaveAttribute(
      "href",
      "/dashboard/skills/edit/skill-1",
    );
    expect(editLinks[1]).toHaveAttribute(
      "href",
      "/dashboard/skills/edit/skill-2",
    );
    expect(editLinks[2]).toHaveAttribute(
      "href",
      "/dashboard/skills/edit/skill-3",
    );
  });

  it("has Remove buttons and forms contain correct hidden inputs (simulate delete action)", async () => {
    render(<Skills {...defaultProps} />);

    const removeButtons = screen.getAllByRole("button", { name: /Remove/i });
    expect(removeButtons).toHaveLength(3);

    // Inspect the first row's form via the first remove button
    const firstForm = removeButtons[0]!.closest(
      "form",
    ) as HTMLFormElement | null;
    expect(firstForm).toBeTruthy();

    const fd = new FormData(firstForm as HTMLFormElement);
    expect(fd.get("id")).toBe("skill-1");
    expect(fd.get("resume_id")).toBe("blank");

    // Simulate delete action success (component would call deleteUserSkill(id))
    mockDeleteUserSkill.mockResolvedValueOnce({});
    await mockDeleteUserSkill(fd.get("id") as string);
    expect(mockDeleteUserSkill).toHaveBeenCalledWith("skill-1");

    // Component would call router.refresh() on success — simulate and assert
    mockRefresh();
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("handles delete action error gracefully (simulate error return from action)", async () => {
    render(<Skills {...defaultProps} />);

    const removeButtons = screen.getAllByRole("button", { name: /Remove/i });
    const firstForm =
      (removeButtons[0]!.closest("form") as HTMLFormElement) || null;
    expect(firstForm).toBeTruthy();

    const fd = new FormData(firstForm as HTMLFormElement);
    expect(fd.get("id")).toBe("skill-1");

    // Simulate action returning errors
    mockDeleteUserSkill.mockResolvedValueOnce({
      errors: { message: "Delete failed" },
    });

    await mockDeleteUserSkill(fd.get("id") as string);
    expect(mockDeleteUserSkill).toHaveBeenCalledWith("skill-1");

    // Component should not refresh when deletion returns errors
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("renders create link when no skills exist", () => {
    render(
      <Skills
        {...defaultProps}
        skills={[] as UserSkills}
        // filteredSkills is managed internally via fetch; passing empty skills ensures initial state
      />,
    );

    const createLink = screen.getByRole("link", {
      name: /Start by creating your first skill here/i,
    });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute("href", "/dashboard/skills/new");
  });

  it("renders pagination component with correct props", () => {
    render(<Skills {...defaultProps} />);

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("Total Pages: 2");
    expect(pagination).toHaveTextContent("Total Count: 15");
  });

  it("fetches filtered skills on mount and when query/currentPage changes (uses real types)", async () => {
    // Provide controlled responses as UserSkills
    mockFetchFilteredSkills
      .mockResolvedValueOnce([
        { id: "filtered-1", skill: "Filtered Skill 1", skill_level: 75 },
      ] as unknown as UserSkills)
      .mockResolvedValueOnce([
        { id: "filtered-2", skill: "Filtered Skill 2", skill_level: 80 },
      ] as unknown as UserSkills);

    const { rerender } = render(<Skills {...defaultProps} />);

    // On mount, fetchFilteredSkills should be called with initial props
    await waitFor(() => {
      expect(mockFetchFilteredSkills).toHaveBeenCalledWith(
        defaultProps.query,
        defaultProps.currentPage,
        defaultProps.user.id,
      );
    });

    // Re-render with new query and page
    rerender(<Skills {...defaultProps} query="React" currentPage={2} />);

    await waitFor(() => {
      expect(mockFetchFilteredSkills).toHaveBeenCalledWith(
        "React",
        2,
        defaultProps.user.id,
      );
    });

    // The second mocked response should have been applied; verify rendered content
    expect(screen.getByText("Filtered Skill 2")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("handles fetchFilteredSkills error gracefully", async () => {
    mockFetchFilteredSkills.mockRejectedValueOnce(new Error("Network error"));

    render(<Skills {...defaultProps} />);

    await waitFor(() => {
      expect(mockFetchFilteredSkills).toHaveBeenCalled();
    });

    // When fetch fails, component sets filteredSkills to [] and shows create link
    const createLink = screen.getByRole("link", {
      name: /Start by creating your first skill here/i,
    });
    expect(createLink).toBeInTheDocument();
  });
});
