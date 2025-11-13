/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YourOrganizations from "../your-organizations";
import * as actions from "@/app/lib/actions";
import type { Resume, User } from "@/app/lib/definitions";

// Mock the actions module
jest.mock("@/app/lib/actions", () => ({
  createOrganization: jest.fn(),
  createResumeLine: jest.fn(),
  deleteResumeLine: jest.fn(),
  updateOrganizationSection: jest.fn(),
  updateOrganizationSectionTitle: jest.fn(),
  updateUserOrganization: jest.fn(),
}));

// Mock SubmitButton so it renders as a plain button
jest.mock("@/app/ui/submit-button", () => ({
  SubmitButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("YourOrganizations", () => {
  const user = userEvent.setup();

  const mockUser = {
    id: "user1",
    name: "Test User",
    email: "t@test.com",
    password: "",
    first_name: "Test",
    last_name: "User",
    address_one: "",
    address_two: "",
    address_three: "",
    phone: "",
    website: "",
    thumbnail: "",
    linked_in: "",
    twitter: "",
    facebook: "",
    instagram: "",
    github: "",
    country: "",
    created_at: "",
    updated_at: "",
    new_user: "false",
    access_level: "",
    tour_dashboard: "",
    tour_education: "",
    tour_skills: "",
    tour_applications: "",
    tour_companies: "",
    tour_work_experience: "",
    tour_certifications: "",
    tour_organizations: "",
    tour_resume_templates: "",
    tour_user_profile: "",
  } as unknown as User;

  const mockResume = {
    id: "resume1",
    created_at: "",
    application_id: "",
    updated_at: "",
    user_id: "user1",
    company_id: "",
    title: "My Resume",
    template: "",
    color: "",
    heading_font: "",
    body_font: "",
    show_social_icons: "false",
    show_skill_progress: "false",
    show_skills_section: "false",
    show_education_section: "true",
    show_custom_section_one: "true",
    custom_section_one_name: "Organizations",
    show_custom_section_two: "false",
    custom_section_two_name: "",
    description: "",
    highlight_color: "",
  } as unknown as Resume;

  const mockUserOrganizations = [
    {
      id: "org1",
      name: "Organization One",
      location: "City X",
      start_date: "2020-01",
      end_date: "2021-01",
      description: "Worked on stuff",
      user_id: "user1",
    },
    {
      id: "org2",
      name: "Organization Two",
      location: "City Y",
      start_date: "2021-02",
      end_date: "",
      description: "Volunteered",
      user_id: "user1",
    },
  ];

  const mockOrganizationResumeLines = [
    {
      id: "line1",
      user_organization_id: "org1",
      resume_id: "resume1",
      user_id: "user1",
      name: "Organization One",
      location: "City X",
      start_date: "2020-01",
      end_date: "2021-01",
      description: "Worked on stuff",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent(overrides = {}) {
    const defaults = {
      userOrganizations: mockUserOrganizations,
      resume: mockResume,
      user: mockUser,
      showCustomSectionOne: "true",
      setShowCustomSectionOne: jest.fn(),
      organizationResumeLines: mockOrganizationResumeLines,
    };
    const props = { ...defaults, ...overrides };
    return render(<YourOrganizations {...(props as any)} />);
  }

  function formDataFromForm(form: HTMLFormElement) {
    return new FormData(form);
  }

  it("create organization form shows Add New Entry when fields edited and FormData is correct", async () => {
    renderComponent();

    // find the create org name input (there are multiple inputs with same placeholders/ids in DOM)
    const nameInput = screen.getAllByPlaceholderText(
      "Title, Activity, name, etc..",
    )[0] as HTMLInputElement;
    if (!nameInput) throw new Error("Create org name input not found");

    await user.type(nameInput, "New Org");

    // scope to the create form to avoid ambiguous "Location" matches
    const createForm = nameInput.closest("form") as HTMLFormElement | null;
    if (!createForm) throw new Error("Create organization form not found");

    const { getByPlaceholderText } = within(createForm);

    const locationInput = getByPlaceholderText("Location") as HTMLInputElement;
    await user.type(locationInput, "New City");

    const description = getByPlaceholderText(
      "Description",
    ) as HTMLTextAreaElement;
    await user.type(description, "A description");

    const fd = formDataFromForm(createForm);
    expect(fd.get("resume_id")).toBe(mockResume.id);
    expect(fd.get("section_title")).toBe(mockResume.custom_section_one_name);
    expect(fd.get("user_id")).toBe(mockUser.id);
    expect(fd.get("organization_name")).toBe("New Org");
    expect(fd.get("organization_location")).toBe("New City");
    expect(fd.get("organization_description")).toBe("A description");

    (actions.createOrganization as jest.Mock).mockResolvedValueOnce({});
    await (actions.createOrganization as jest.Mock)(fd);
    expect(actions.createOrganization).toHaveBeenCalledWith(fd);
  });

  it("selected organization resume lines have delete form with expected hidden values and update form fields populated", async () => {
    renderComponent();

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    expect(removeButtons.length).toBeGreaterThan(0);

    const removeBtn = removeButtons[0];
    const removeForm = removeBtn!.closest("form") as HTMLFormElement | null;
    if (!removeForm) throw new Error("Delete resume line form not found");

    const fdRemove = formDataFromForm(removeForm);
    expect(fdRemove.get("resume_id")).toBe(mockResume.id);
    expect(fdRemove.get("user_id")).toBe(mockUser.id);
    expect(fdRemove.get("line_type")).toBe("custom-section-one");
    expect(fdRemove.get("id")).toBe("line1");

    const li = removeBtn!.closest("li");
    if (!li) throw new Error("Selected organization li not found");

    // scope to this li to avoid collisions
    const { getByPlaceholderText } = within(li);

    const instInput = getByPlaceholderText(
      "Title, Activity, name, etc..",
    ) as HTMLInputElement;
    expect(instInput).toHaveValue("Organization One");

    const locInput = getByPlaceholderText("Location") as HTMLInputElement;
    expect(locInput).toHaveValue("City X");

    // edit and ensure form data reflects new value
    await user.clear(instInput);
    await user.type(instInput, "Organization One Updated");

    const updateForm = instInput.closest("form") as HTMLFormElement | null;
    if (!updateForm) throw new Error("Update user organization form not found");

    const fdUpdate = formDataFromForm(updateForm);
    expect(fdUpdate.get("user_id")).toBe(mockUser.id);
    expect(fdUpdate.get("organization_id")).toBe("line1");
    // the form's FormData will use the current input values
    expect(fdUpdate.get("organization_name")).toBe("Organization One Updated");

    (actions.updateUserOrganization as jest.Mock).mockResolvedValueOnce({});
    await (actions.updateUserOrganization as jest.Mock)(fdUpdate);
    expect(actions.updateUserOrganization).toHaveBeenCalledWith(fdUpdate);
  });
});
