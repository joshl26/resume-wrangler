// app/ui/forms/__tests__/your-cover-letter-experiences.test.tsx
/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YourCoverLetterExperiences from "../your-cover-letter-experiences";
import * as actions from "@/app/lib/actions";
import type {
  User,
  UserCoverExperience,
  UserCoverExperienceLines,
  CoverLetter,
} from "@/app/lib/definitions";

// Mock the actions module
jest.mock("@/app/lib/actions", () => ({
  createCoverLine: jest.fn(),
  deleteCoverLine: jest.fn(),
}));

// Mock the SubmitButton component
jest.mock("@/app/ui/submit-button", () => ({
  SubmitButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("YourCoverLetterExperiences", () => {
  const user = userEvent.setup();

  // Mock data with proper typing
  const mockUser: User = {
    id: "user1",
    name: "Test User",
    email: "test@example.com",
    password: "password",
    first_name: "Test",
    last_name: "User",
    address_one: "123 Main St",
    address_two: "",
    address_three: "",
    phone: "555-1234",
    website: "https://example.com",
    thumbnail: "",
    linked_in: "",
    twitter: "",
    facebook: "",
    instagram: "",
    github: "",
    country: "USA",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    new_user: "false",
    access_level: "user",
    tour_dashboard: "false",
    tour_education: "false",
    tour_skills: "false",
    tour_applications: "false",
    tour_companies: "false",
    tour_work_experience: "false",
    tour_certifications: "false",
    tour_organizations: "false",
    tour_resume_templates: "false",
    tour_user_profile: "false",
  };

  const mockCoverLetter: CoverLetter = {
    id: "cover1",
    user_id: "user1",
    title: "Test Cover Letter",
    body: "Cover letter content",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  };

  const mockUserCoverExperiences: UserCoverExperience[] = [
    {
      id: "exp1",
      user_id: "user1",
      title: "Software Engineer",
      description: "Developed web applications",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
    },
    {
      id: "exp2",
      user_id: "user1",
      title: "Frontend Developer",
      description: "Built React applications",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
    },
  ];

  const mockSelectedCoverExperiences: UserCoverExperienceLines = [
    {
      id: "line1",
      cover_letter_id: "cover1",
      cover_experience_id: "exp1",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders section title correctly", () => {
    render(
      <YourCoverLetterExperiences
        userCoverExperiences={mockUserCoverExperiences}
        user={mockUser}
        selectedCoverExperiences={mockSelectedCoverExperiences}
        coverLetter={mockCoverLetter}
      />,
    );

    expect(screen.getByText("Your Cover Experiences")).toBeInTheDocument();
  });

  it("displays user cover experiences list", () => {
    render(
      <YourCoverLetterExperiences
        userCoverExperiences={mockUserCoverExperiences}
        user={mockUser}
        selectedCoverExperiences={mockSelectedCoverExperiences}
        coverLetter={mockCoverLetter}
      />,
    );

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("shows Add and Remove buttons for each experience", () => {
    render(
      <YourCoverLetterExperiences
        userCoverExperiences={mockUserCoverExperiences}
        user={mockUser}
        selectedCoverExperiences={mockSelectedCoverExperiences}
        coverLetter={mockCoverLetter}
      />,
    );

    const softwareEngineerItem = screen
      .getByText("Software Engineer")
      .closest("li");
    if (!softwareEngineerItem)
      throw new Error("Software Engineer list item not found");

    const { getAllByRole } = within(softwareEngineerItem);
    const buttons = getAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent("Add");
    expect(buttons[1]).toHaveTextContent("Remove");
  });

  it("calls createCoverLine action when Add button is clicked", async () => {
    (actions.createCoverLine as jest.Mock).mockResolvedValueOnce({});

    render(
      <YourCoverLetterExperiences
        userCoverExperiences={mockUserCoverExperiences}
        user={mockUser}
        selectedCoverExperiences={mockSelectedCoverExperiences}
        coverLetter={mockCoverLetter}
      />,
    );

    const softwareEngineerItem = screen
      .getByText("Software Engineer")
      .closest("li");
    if (!softwareEngineerItem)
      throw new Error("Software Engineer list item not found");

    const { getByRole } = within(softwareEngineerItem);
    const addButton = getByRole("button", { name: /add/i });
    await user.click(addButton);

    await waitFor(() =>
      expect(actions.createCoverLine).toHaveBeenCalledWith(
        expect.any(FormData),
      ),
    );

    const formData = (actions.createCoverLine as jest.Mock).mock.calls[0][0];
    expect(formData.get("user_id")).toBe("user1");
    expect(formData.get("line_type")).toBe("experience");
    expect(formData.get("cover_letter_id")).toBe("cover1");
    expect(formData.get("experience_id")).toBe("exp1");
  });

  it("calls deleteCoverLine action when Remove button is clicked", async () => {
    (actions.deleteCoverLine as jest.Mock).mockResolvedValueOnce({});

    render(
      <YourCoverLetterExperiences
        userCoverExperiences={mockUserCoverExperiences}
        user={mockUser}
        selectedCoverExperiences={mockSelectedCoverExperiences}
        coverLetter={mockCoverLetter}
      />,
    );

    const softwareEngineerItem = screen
      .getByText("Software Engineer")
      .closest("li");
    if (!softwareEngineerItem)
      throw new Error("Software Engineer list item not found");

    const { getByRole } = within(softwareEngineerItem);
    const removeButton = getByRole("button", { name: /remove/i });
    await user.click(removeButton);

    await waitFor(() =>
      expect(actions.deleteCoverLine).toHaveBeenCalledWith(
        expect.any(FormData),
      ),
    );

    const formData = (actions.deleteCoverLine as jest.Mock).mock.calls[0][0];
    expect(formData.get("user_id")).toBe("user1");
    expect(formData.get("line_type")).toBe("experience");
    expect(formData.get("cover_letter_id")).toBe("cover1");
    expect(formData.get("experience_id")).toBe("exp1");
  });

  it("handles empty experiences list", () => {
    render(
      <YourCoverLetterExperiences
        userCoverExperiences={[]}
        user={mockUser}
        selectedCoverExperiences={[]}
        coverLetter={mockCoverLetter}
      />,
    );

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(0);
  });

  it("handles action errors gracefully", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (actions.createCoverLine as jest.Mock).mockResolvedValueOnce({
      errors: ["Failed to create cover line"],
    });

    render(
      <YourCoverLetterExperiences
        userCoverExperiences={mockUserCoverExperiences}
        user={mockUser}
        selectedCoverExperiences={mockSelectedCoverExperiences}
        coverLetter={mockCoverLetter}
      />,
    );

    const softwareEngineerItem = screen
      .getByText("Software Engineer")
      .closest("li");
    if (!softwareEngineerItem)
      throw new Error("Software Engineer list item not found");

    const { getByRole } = within(softwareEngineerItem);
    const addButton = getByRole("button", { name: /add/i });
    await user.click(addButton);

    await waitFor(() =>
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Create cover line failed:",
        expect.objectContaining({ errors: ["Failed to create cover line"] }),
      ),
    );

    consoleErrorSpy.mockRestore();
  });
});
