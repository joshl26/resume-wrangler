/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YourEducation from "../your-education";
import * as actions from "@/app/lib/actions";
import type {
  Resume,
  User,
  UserEducationExperience,
  UserEducationExperiences,
} from "@/app/lib/definitions";

// Mock the actions module
jest.mock("@/app/lib/actions", () => ({
  createResumeLine: jest.fn(),
  deleteResumeLine: jest.fn(),
  updateEducationSection: jest.fn(),
  updateUserEducation: jest.fn(),
}));

// Mock SubmitButton so it renders as a plain button (clickable)
jest.mock("@/app/ui/submit-button", () => ({
  SubmitButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("YourEducation", () => {
  const user = userEvent.setup();

  const mockUser: User = {
    id: "user1",
    name: "Test",
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

  const mockResume: Resume = {
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
    show_custom_section_one: "false",
    custom_section_one_name: "",
    show_custom_section_two: "false",
    custom_section_two_name: "",
    description: "",
    highlight_color: "",
  } as unknown as Resume;

  const mockUserEducation: UserEducationExperiences = [
    {
      id: "edu1",
      institution_name: "University A",
      program: "BSc Computer Science",
      url: "https://uni-a.edu",
      user_id: "user1",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
      location: "City A",
      start_date: "2018-09",
      end_date: "2022-06",
      description_one: "",
      description_two: "",
      description_three: "",
      grade: "3.9",
    },
    {
      id: "edu2",
      institution_name: "College B",
      program: "Diploma Web Dev",
      url: "https://college-b.edu",
      user_id: "user1",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
      location: "City B",
      start_date: "2016-09",
      end_date: "2018-06",
      description_one: "",
      description_two: "",
      description_three: "",
      grade: "4.0",
    },
  ] as unknown as UserEducationExperiences;

  // This represents resume lines already added (selected)
  // NOTE: include institution_name and other fields so the edit form has default values
  const mockEducationResumeLines = [
    {
      id: "line1", // this is the resume-line id used in the editing form hidden education_id
      user_education_id: "edu1",
      resume_id: "resume1",
      user_id: "user1",
      institution_name: "University A",
      location: "City A",
      start_date: "2018-09",
      end_date: "2022-06",
      grade: "3.9",
      program: "BSc Computer Science",
      url: "https://uni-a.edu",
    },
  ];

  const mockSetShowEducation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent(
    overrides: {
      userEducation?: any;
      user?: any;
      resume?: any;
      showEducation?: any;
      setShowEducation?: any;
      educationResumeLines?: any;
    } = {},
  ) {
    const props = {
      userEducation: overrides.userEducation ?? mockUserEducation,
      user: overrides.user ?? mockUser,
      resume: overrides.resume ?? mockResume,
      showEducation: overrides.showEducation ?? "true",
      setShowEducation: overrides.setShowEducation ?? mockSetShowEducation,
      educationResumeLines:
        overrides.educationResumeLines ?? mockEducationResumeLines,
    };

    return render(<YourEducation {...(props as any)} />);
  }

  it("renders title and lists when showEducation is true", () => {
    renderComponent();

    expect(screen.getByText(/Your Education/i)).toBeInTheDocument();
    // Each education should be displayed in the choose-experiences list
    expect(screen.getByText("University A")).toBeInTheDocument();
    expect(screen.getByText("BSc Computer Science")).toBeInTheDocument();
    expect(screen.getByText("College B")).toBeInTheDocument();
  });

  it("hides education content when showEducation is false", () => {
    renderComponent({ showEducation: "false" });

    // The "Choose Education Experiences" heading should not be present when showEducation === 'false'
    expect(
      screen.queryByText(/Choose Education Experiences/i),
    ).not.toBeInTheDocument();
  });

  it("calls createResumeLine when Add is clicked for an education item", async () => {
    (actions.createResumeLine as jest.Mock).mockResolvedValueOnce({});

    renderComponent();

    const universityItem = screen.getByText("University A").closest("li");
    if (!universityItem) throw new Error("University list item not found");

    const { getByRole } = within(universityItem);
    const addButton = getByRole("button", { name: /add/i });
    await user.click(addButton);

    await waitFor(() =>
      expect(actions.createResumeLine).toHaveBeenCalledWith(
        expect.any(FormData),
      ),
    );

    const formData = (actions.createResumeLine as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("resume_id")).toBe(mockResume.id);
    expect(formData.get("user_id")).toBe(mockUser.id);
    expect(formData.get("line_type")).toBe("education");
    expect(formData.get("id")).toBe("edu1");
  });

  it("renders selected education resume lines and calls deleteResumeLine when Remove clicked", async () => {
    (actions.deleteResumeLine as jest.Mock).mockResolvedValueOnce({});

    renderComponent();

    // Find the selected resume line list item by locating the "Remove" button inside it
    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    expect(removeButtons.length).toBeGreaterThan(0);

    const removeButton = removeButtons[0];
    const selectedItem = removeButton!.closest("li");
    if (!selectedItem)
      throw new Error("Selected resume line list item not found");

    const { getByRole: getByRoleInSelected } = within(selectedItem);
    const remove = getByRoleInSelected("button", { name: /remove/i });
    await user.click(remove);

    await waitFor(() =>
      expect(actions.deleteResumeLine).toHaveBeenCalledWith(
        expect.any(FormData),
      ),
    );

    const formData = (actions.deleteResumeLine as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("user_id")).toBe(mockUser.id);
    expect(formData.get("resume_id")).toBe(mockResume.id);
    expect(formData.get("user_education_id")).toBe("edu1");
  });

  it("shows Save Change when editing an education field and calls updateUserEducation on submit", async () => {
    (actions.updateUserEducation as jest.Mock).mockResolvedValueOnce({});

    renderComponent();

    // Scope to the selected resume-line item (where editing form is rendered)
    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    if (removeButtons.length === 0)
      throw new Error("No selected resume-line remove button found");
    const selectedItem = removeButtons[0]!.closest("li");
    if (!selectedItem)
      throw new Error("Selected resume line list item not found");

    const { getByLabelText, getAllByRole } = within(selectedItem);

    const instInput = getByLabelText("Institution Name") as HTMLInputElement;
    // Ensure it has the default value from our mock
    expect(instInput).toHaveValue("University A");

    await user.clear(instInput);
    await user.type(instInput, "University A Updated");

    // After editing, a Save Change button should appear (could be multiple, choose the first)
    const saveButtons = getAllByRole("button", { name: /save change/i });
    expect(saveButtons.length).toBeGreaterThan(0);
    await user.click(saveButtons[0]!);

    await waitFor(() =>
      expect(actions.updateUserEducation).toHaveBeenCalledWith(
        expect.any(FormData),
      ),
    );

    const formData = (actions.updateUserEducation as jest.Mock).mock
      .calls[0][0] as FormData;
    // Note: the component uses the resume-line id as the hidden education_id in the edit form
    expect(formData.get("education_id")).toBe("line1");
    expect(formData.get("institution_name")).toBe("University A Updated");
  });

  it("toggles showEducation checkbox and calls updateEducationSection on save", async () => {
    (actions.updateEducationSection as jest.Mock).mockResolvedValueOnce({});

    const setShow = jest.fn();
    renderComponent({ setShowEducation: setShow });

    const checkbox = screen.getByTitle(
      "Show Education Section?",
    ) as HTMLInputElement;
    await user.click(checkbox);

    // setShowEducation should be called with 'false' (toggle off)
    expect(setShow).toHaveBeenCalledWith("false");

    // After toggling, the sectionEdited flag is true so Save Change button should appear
    const saveButtons = screen.queryAllByRole("button", {
      name: /save change/i,
    });
    if (saveButtons.length === 0)
      throw new Error("No Save Change button found after toggling section");
    await user.click(saveButtons[0]!);

    await waitFor(() =>
      expect(actions.updateEducationSection).toHaveBeenCalledWith(
        expect.any(FormData),
      ),
    );

    const formData = (actions.updateEducationSection as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("user_id")).toBe(mockUser.id);
    expect(formData.get("resume_id")).toBe(mockResume.id);
    expect(formData.get("show_education_section")).toBeDefined();
  });

  it("handles empty education lists gracefully", () => {
    renderComponent({ userEducation: [], educationResumeLines: [] });

    // No education entries should be present
    expect(screen.queryByText("University A")).not.toBeInTheDocument();
    expect(screen.queryByText("College B")).not.toBeInTheDocument();

    // No remove buttons (selected lines) should exist
    expect(screen.queryAllByRole("button", { name: /remove/i }).length).toBe(0);
  });
});
