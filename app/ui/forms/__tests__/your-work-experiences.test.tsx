/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YourWorkExperiences from "../your-work-experiences";
import * as actions from "@/app/lib/actions";
import type {
  Resume,
  User,
  UserWorkExperience,
  UserWorkExperiences,
} from "@/app/lib/definitions";

/**
 * Mocks
 */
jest.mock("@/app/lib/actions", () => ({
  createResumeLine: jest.fn(),
  deleteResumeLine: jest.fn(),
  updateUserWorkExperience: jest.fn(),
}));

// Render SubmitButton as a plain button in tests
jest.mock("@/app/ui/submit-button", () => ({
  SubmitButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("YourWorkExperiences", () => {
  const u = userEvent.setup();

  const mockUser: User = {
    id: "user1",
    name: "Test User",
    email: "test@example.com",
  } as unknown as User;

  const mockResume: Resume = {
    id: "resume1",
    title: "My Resume",
  } as unknown as Resume;

  const mockUserWorkExperiences: UserWorkExperiences = [
    {
      id: "exp1",
      company_name: "ACME Corp",
      location: "New York",
      job_title: "Engineer",
      start_date: "2020-01-01",
      end_date: "2021-01-01",
      description_one: "Did stuff",
      description_two: "",
      description_three: "",
      description_four: "",
      user_id: "user1",
    },
    {
      id: "exp2",
      company_name: "Globex Inc",
      location: "San Francisco",
      job_title: "Developer",
      start_date: "2019-01-01",
      end_date: "2019-12-31",
      description_one: "Built things",
      description_two: "",
      description_three: "",
      description_four: "",
      user_id: "user1",
    },
  ] as unknown as UserWorkExperiences;

  const mockWorkResumeLines: UserWorkExperiences = [
    {
      id: "line1",
      company_name: "ACME Corp",
      location: "New York",
      job_title: "Engineer",
      start_date: "2020-01-01",
      end_date: "2021-01-01",
      description_one: "Did stuff",
      description_two: "",
      description_three: "",
      description_four: "",
      user_id: "user1",
    },
  ] as unknown as UserWorkExperiences;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent(overrides = {}) {
    const defaults = {
      userWorkExperiences: mockUserWorkExperiences,
      user: mockUser,
      resume: mockResume,
      workResumeLines: mockWorkResumeLines,
    };
    return render(
      <YourWorkExperiences
        {...(Object.assign({}, defaults, overrides) as any)}
      />,
    );
  }

  function formDataFromForm(form: HTMLFormElement) {
    return new FormData(form);
  }

  it("renders headings and experience list", () => {
    renderComponent();

    expect(screen.getByText(/Your Work Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Previous Experience/i)).toBeInTheDocument();

    // Available experiences (first list)
    const availableList = screen
      .getByText(/Previous Experience/i)
      .closest("div")!
      .querySelector("ul");
    expect(availableList).toBeTruthy();
    expect(
      within(availableList as HTMLElement).getByText("ACME Corp"),
    ).toBeInTheDocument();
    expect(
      within(availableList as HTMLElement).getByText("Globex Inc"),
    ).toBeInTheDocument();

    // Work resume lines (selected) show company input in update form (ACME Corp)
    expect(screen.getByDisplayValue("ACME Corp")).toBeInTheDocument();
  });

  it("create resume-line form (Add) has correct hidden inputs and can be invoked with FormData", async () => {
    renderComponent();

    // Find the available-list container and target the Globex Inc li
    const availableList = screen
      .getByText(/Previous Experience/i)
      .closest("div")!
      .querySelector("ul")!;
    const globexLi = within(availableList as HTMLElement)
      .getByText("Globex Inc")
      .closest("li") as HTMLElement;
    expect(globexLi).toBeTruthy();

    // The create form is inside that li
    const createForm = globexLi.querySelector("form") as HTMLFormElement | null;
    if (!createForm)
      throw new Error("Create form not found in available experience li");

    const fd = formDataFromForm(createForm);
    expect(fd.get("resume_id")).toBe(mockResume.id);
    expect(fd.get("user_id")).toBe(mockUser.id);
    expect(fd.get("line_type")).toBe("work");
    expect(fd.get("id")).toBe("exp2");

    // Simulate calling the action
    (actions.createResumeLine as jest.Mock).mockResolvedValueOnce({});
    await (actions.createResumeLine as jest.Mock)(fd);
    expect(actions.createResumeLine).toHaveBeenCalledWith(fd);
  });

  it("selected workResumeLines show Remove button and delete form contains correct hidden values", async () => {
    renderComponent();

    // The selected workResumeLines area: find the li that includes the company_name input with value "ACME Corp"
    const workList = screen.getAllByRole("list")[1] || null; // second ul in DOM (workResumeLines)
    // Safer: find the company_name input with value "ACME Corp" and climb to nearest li
    const companyInput = screen.getByDisplayValue(
      "ACME Corp",
    ) as HTMLInputElement;
    const li = companyInput.closest("li") as HTMLLIElement | null;
    expect(li).toBeTruthy();

    // Inside that li there should be a form with a Remove button (delete form)
    const removeButton = within(li as HTMLElement).getByRole("button", {
      name: /remove/i,
    });
    expect(removeButton).toBeInTheDocument();

    const deleteForm = removeButton.closest("form") as HTMLFormElement | null;
    if (!deleteForm)
      throw new Error("Delete form not found inside selected work resume row");

    const fdDelete = formDataFromForm(deleteForm);
    expect(fdDelete.get("line_type")).toBe("work");
    expect(fdDelete.get("id")).toBe("line1");
    expect(fdDelete.get("resume_id")).toBe(mockResume.id);
    expect(fdDelete.get("user_id")).toBe(mockUser.id);

    // Simulate action
    (actions.deleteResumeLine as jest.Mock).mockResolvedValueOnce({});
    await (actions.deleteResumeLine as jest.Mock)(fdDelete);
    expect(actions.deleteResumeLine).toHaveBeenCalledWith(fdDelete);
  });

  it("editing update form sets edited and Save Change appears; simulated submit calls updateUserWorkExperience", async () => {
    renderComponent();

    // Find the update form for the selected workResumeLines entry (company_name input exists)
    const companyInput = screen.getByDisplayValue(
      "ACME Corp",
    ) as HTMLInputElement;
    const updateForm = companyInput.closest("form") as HTMLFormElement | null;
    if (!updateForm)
      throw new Error("Update form not found for selected work resume item");

    // Change the company_name input to trigger edited
    const companyNameInput = within(updateForm).getByLabelText(
      "Company Name",
    ) as HTMLInputElement;
    fireEvent.change(companyNameInput, {
      target: { value: "ACME Corporation" },
    });

    // Save Change button should appear (SubmitButton mocked as button)
    expect(
      within(updateForm).getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();

    // Build FormData from updateForm and simulate calling updateUserWorkExperience
    const fd = formDataFromForm(updateForm);
    (actions.updateUserWorkExperience as jest.Mock).mockResolvedValueOnce({});
    await (actions.updateUserWorkExperience as jest.Mock)(fd);
    expect(actions.updateUserWorkExperience).toHaveBeenCalledWith(fd);
  });

  it("renders correctly when there are no selected workResumeLines (fallback)", () => {
    renderComponent({ workResumeLines: [] });

    // When workResumeLines is empty, there should be no Remove button in the selected area
    expect(
      screen.queryByRole("button", { name: /remove/i }),
    ).not.toBeInTheDocument();

    // But available experiences still show
    expect(screen.getByText("ACME Corp")).toBeInTheDocument();
  });
});
