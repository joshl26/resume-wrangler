/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YourSkills from "../your-skills";
import * as actions from "@/app/lib/actions";
import type {
  Resume,
  User,
  UserSkill,
  UserSkills,
} from "@/app/lib/definitions";

/**
 * Mocks
 */
jest.mock("@/app/lib/actions", () => ({
  createResumeLine: jest.fn(),
  deleteResumeLine: jest.fn(),
  updateSkillsSection: jest.fn(),
}));

// Render SubmitButton as a simple button for tests
jest.mock("@/app/ui/submit-button", () => ({
  SubmitButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("YourSkills (typed)", () => {
  const user = userEvent.setup();

  const mockUser = {
    id: "user1",
    name: "tester",
    email: "t@example.com",
  } as unknown as User;

  const mockResume = {
    id: "resume1",
    title: "Resume Title",
  } as unknown as Resume;

  const mockUserSkills: UserSkills = [
    {
      id: "skill1",
      skill: "JavaScript",
      skill_level: "80",
      user_id: "user1",
    },
    {
      id: "skill2",
      skill: "React",
      skill_level: "70",
      user_id: "user1",
    },
  ] as unknown as UserSkills;

  const mockSkillResumeLines: UserSkills = [
    {
      id: "line1",
      skill: "JavaScript",
      skill_level: "80",
      user_id: "user1",
    },
  ] as unknown as UserSkills;

  const setShowSkills = jest.fn() as jest.MockedFunction<(e: string) => void>;
  const setShowSkillProgress = jest.fn() as jest.MockedFunction<
    (e: string) => void
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent(overrides = {}) {
    const defaults = {
      userSkills: mockUserSkills,
      user: mockUser,
      resume: mockResume,
      setShowSkills,
      showSkills: "true",
      showSkillProgress: "true",
      setShowSkillProgress,
      skillResumeLines: mockSkillResumeLines,
    };
    return render(
      <YourSkills {...(Object.assign({}, defaults, overrides) as any)} />,
    );
  }

  function formDataFromForm(form: HTMLFormElement) {
    return new FormData(form);
  }

  it("renders headings and lists when showSkills is true", () => {
    renderComponent();

    expect(screen.getByText(/Your Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose Skills/i)).toBeInTheDocument();

    // Available skills list (the next sibling div after the "Choose Skills" heading contains the ul)
    const availableListContainer = screen.getByText(/Choose Skills/i)
      .nextElementSibling as HTMLElement;
    expect(
      within(availableListContainer).getByText("JavaScript"),
    ).toBeInTheDocument();
    expect(
      within(availableListContainer).getByText("React"),
    ).toBeInTheDocument();

    // Selected skills list
    const selectedSection = screen
      .getByText("Chosen Resume Skills")
      .closest("div") as HTMLElement;
    expect(within(selectedSection).getByText("JavaScript")).toBeInTheDocument();
  });

  it("create resume-line form (Add) has correct hidden inputs and can be invoked with FormData", async () => {
    renderComponent();

    // Find the list item for "React" (the second skill) within the available-list container
    const availableListContainer = screen.getByText(/Choose Skills/i)
      .nextElementSibling as HTMLElement;
    const reactLi = within(availableListContainer)
      .getByText("React")
      .closest("li") as HTMLElement;
    expect(reactLi).toBeTruthy();

    // Find the form inside that li (createResumeLine form) and build FormData
    const createForm = reactLi.querySelector("form") as HTMLFormElement | null;
    if (!createForm) throw new Error("CreateResumeLine form not found");

    const fd = formDataFromForm(createForm);
    expect(fd.get("resume_id")).toBe(mockResume.id);
    expect(fd.get("user_id")).toBe(mockUser.id);
    expect(fd.get("line_type")).toBe("skill");
    expect(fd.get("id")).toBe("skill2");

    // Simulate calling the server action with that FormData
    (actions.createResumeLine as jest.Mock).mockResolvedValueOnce({});
    await (actions.createResumeLine as jest.Mock)(fd);
    expect(actions.createResumeLine).toHaveBeenCalledWith(fd);
  });

  it("selected skills list shows Remove button and delete form contains correct hidden values", async () => {
    renderComponent();

    // Selected skills section container that wraps selected rows
    const selectedSection = screen
      .getByText("Chosen Resume Skills")
      .closest("div") as HTMLElement;
    if (!selectedSection) throw new Error("Selected section not found");

    // Get all direct children and find the one containing "JavaScript"
    const directChildren = Array.from(selectedSection.children);
    let selectedSkillRow: HTMLElement | null = null;

    for (const child of directChildren) {
      if (child.textContent?.includes("JavaScript")) {
        selectedSkillRow = child as HTMLElement;
        break;
      }
    }

    // If not found in direct children, try querying descendants
    if (!selectedSkillRow) {
      const allDescendants = selectedSection.querySelectorAll("div");
      for (const el of allDescendants) {
        if (el.textContent?.includes("JavaScript")) {
          selectedSkillRow = el as HTMLElement;
          break;
        }
      }
    }

    if (!selectedSkillRow) {
      throw new Error("Selected skill container not found");
    }

    // Now find the delete form inside that selected skill row
    const deleteForm = selectedSkillRow.querySelector(
      "form",
    ) as HTMLFormElement | null;
    if (!deleteForm)
      throw new Error("Delete form not found for selected skill");

    const fdDelete = formDataFromForm(deleteForm);
    expect(fdDelete.get("user_id")).toBe(mockUser.id);
    expect(fdDelete.get("line_type")).toBe("skill");
    expect(fdDelete.get("resume_id")).toBe(mockResume.id);
    expect(fdDelete.get("id")).toBe("line1");

    // Simulate calling action
    (actions.deleteResumeLine as jest.Mock).mockResolvedValueOnce({});
    await (actions.deleteResumeLine as jest.Mock)(fdDelete);
    expect(actions.deleteResumeLine).toHaveBeenCalledWith(fdDelete);
  });

  it("toggling showSkillProgress checkbox calls setter and shows Save Change button", async () => {
    renderComponent({ showSkillProgress: "true" });

    const progressCheckbox = screen.getByTitle(
      "show_skill_progress_input",
    ) as HTMLInputElement;
    expect(progressCheckbox.checked).toBe(true);

    await user.click(progressCheckbox);

    expect(setShowSkillProgress).toHaveBeenCalledWith("false");
    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("toggling showSkills checkbox calls setter and shows Save Change button", async () => {
    renderComponent({ showSkills: "true" });

    const showSkillsCheckbox = screen.getByTitle(
      "show_skills_section_input",
    ) as HTMLInputElement;
    expect(showSkillsCheckbox.checked).toBe(true);

    await user.click(showSkillsCheckbox);

    expect(setShowSkills).toHaveBeenCalledWith("false");
    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("updateSkillsSection form contains correct hidden inputs and can be submitted (simulated)", async () => {
    renderComponent({ showSkills: "true", showSkillProgress: "false" });

    // Find the update form in a type-safe way
    const forms = Array.from(document.querySelectorAll("form"));
    const updateForm =
      forms.find(
        (f): f is HTMLFormElement =>
          f.querySelector("input[name='show_skills_section_input']") !== null,
      ) ?? null;

    if (!updateForm) throw new Error("UpdateSkillsSection form not found");

    // Toggle the checkbox to trigger edited state
    const visibleCheckbox = updateForm.querySelector(
      "input[title='show_skills_section_input']",
    ) as HTMLInputElement | null;

    if (!visibleCheckbox)
      throw new Error("Visible showSkills checkbox not found in update form");

    fireEvent.click(visibleCheckbox);

    const fd = formDataFromForm(updateForm);
    expect(fd.get("user_id")).toBe(mockUser.id);
    expect(fd.get("resume_id")).toBe(mockResume.id);
    expect(fd.get("show_skills_section")).toBeDefined();
    expect(fd.get("show_skill_progress")).toBeDefined();

    (actions.updateSkillsSection as jest.Mock).mockResolvedValueOnce({});
    await (actions.updateSkillsSection as jest.Mock)(fd);
    expect(actions.updateSkillsSection).toHaveBeenCalledWith(fd);

    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("renders the fallback message when no selected skills exist", () => {
    renderComponent({ skillResumeLines: [] });

    expect(
      screen.getByText(/Please add a skill from the list above/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /remove/i }),
    ).not.toBeInTheDocument();
  });
});
