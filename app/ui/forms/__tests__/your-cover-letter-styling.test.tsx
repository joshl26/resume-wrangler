/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YourCoverStyling from "../your-cover-styling";
import * as actions from "@/app/lib/actions";
import type {
  CoverLetter,
  CoverTemplates,
  ResumeColors,
  BodyFonts,
  HeaderFonts,
  CoverTemplate,
  ResumeColor,
  BodyFont,
  HeaderFont,
  User,
} from "@/app/lib/definitions";

// Mock the actions module
jest.mock("@/app/lib/actions", () => ({
  updateYourCoverLetterStyle: jest.fn(),
}));

// Mock SubmitButton so it renders as a plain button
jest.mock("@/app/ui/submit-button", () => ({
  SubmitButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("YourCoverStyling", () => {
  const user = userEvent.setup();

  const mockCoverLetter: CoverLetter = {
    id: "cover1",
    user_id: "user1",
    title: "Test Cover",
    body: "Body",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    recipient_title: "Hiring Manager",
    intro_text_start: "Hello",
    intro_text_end: "Thank you",
    conclusion_text: "Sincerely",
    salutation_text: "Regards",
  } as CoverLetter;

  // Cast mocks to the real types to avoid excessive typing of all properties
  const mockCoverTemplates = [
    {
      id: "t1",
      name: "Template A",
      thumbnail_url: "",
      cloudinary_public_url: "",
      description: "template-a",
      created_at: "",
      updated_at: "",
      active: "true",
    },
    {
      id: "t2",
      name: "Template B",
      thumbnail_url: "",
      cloudinary_public_url: "",
      description: "template-b",
      created_at: "",
      updated_at: "",
      active: "true",
    },
  ] as unknown as CoverTemplates;

  const mockResumeColors = [
    {
      id: "c1",
      name: "Blue",
      color: "bg-blue-500",
      updated_at: "",
      created_at: "",
      highlight_color: "#00f",
    },
    {
      id: "c2",
      name: "Red",
      color: "bg-red-500",
      updated_at: "",
      created_at: "",
      highlight_color: "#f00",
    },
  ] as unknown as ResumeColors;

  const mockBodyFonts = [
    {
      id: "bf1",
      name: "body-sans",
      description: "Sans Body",
      created_at: "",
      updated_at: "",
    },
    {
      id: "bf2",
      name: "body-serif",
      description: "Serif Body",
      created_at: "",
      updated_at: "",
    },
  ] as unknown as BodyFonts;

  const mockHeaderFonts = [
    {
      id: "hf1",
      name: "header-sans",
      description: "Sans Header",
      created_at: "",
      updated_at: "",
    },
    {
      id: "hf2",
      name: "header-serif",
      description: "Serif Header",
      created_at: "",
      updated_at: "",
    },
  ] as unknown as HeaderFonts;

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
  } as User;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent(overrides = {}) {
    // Use safe fallback when accessing index 0 (avoids "possibly undefined" errors)
    const defaults = {
      coverLetter: mockCoverLetter,
      coverTemplates: mockCoverTemplates,
      resumeColors: mockResumeColors,
      bodyFonts: mockBodyFonts,
      headerFonts: mockHeaderFonts,
      selectedCoverTemplate: mockCoverTemplates[0]?.description ?? "",
      setSelectedCoverTemplate: jest.fn(),
      selectedCoverBodyFont: mockBodyFonts[0]?.name ?? "",
      setSelectedCoverBodyFont: jest.fn(),
      selectedCoverHeadingFont: mockHeaderFonts[0]?.name ?? "",
      setSelectedCoverHeadingFont: jest.fn(),
      selectedCoverColor: mockResumeColors[0]?.color ?? "",
      setSelectedCoverColor: jest.fn(),
      selectedCoverHighlightColor: mockResumeColors[0]?.name ?? "",
      setSelectedCoverHighlightColor: jest.fn(),
    };

    const props = { ...defaults, ...overrides };

    const utils = render(<YourCoverStyling {...(props as any)} />);
    return { ...utils, props };
  }

  it("renders title and form fields", () => {
    renderComponent();

    expect(screen.getByText(/Cover Styling/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cover Template/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Heading Font/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Body Font/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Recipient Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Intro Start/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Intro End/i)).toBeInTheDocument();
  });

  it("changes template select and calls setter and shows Save Change", async () => {
    const { props } = renderComponent();
    const select = screen.getByLabelText("Cover Template") as HTMLSelectElement;
    await user.selectOptions(select, mockCoverTemplates[1]!.description);

    expect(
      (props.setSelectedCoverTemplate as jest.Mock).mock.calls.length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("clicking a color swatch calls setters and shows Save Change", async () => {
    const { props, container } = renderComponent();
    const swatchId = mockResumeColors[1]!.color;
    const swatch = container.querySelector(`[id="${swatchId}"]`);
    if (!swatch) throw new Error(`Color swatch with id ${swatchId} not found`);

    await user.click(swatch);

    expect(
      props.setSelectedCoverHighlightColor as jest.Mock,
    ).toHaveBeenCalledWith(mockResumeColors[1]!.name);
    expect(props.setSelectedCoverColor as jest.Mock).toHaveBeenCalledWith(
      swatchId,
    );
    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("changes heading/body font selects and shows Save Change", async () => {
    const { props } = renderComponent();

    const headerSelect = screen.getByLabelText(
      "Heading Font",
    ) as HTMLSelectElement;
    await user.selectOptions(headerSelect, mockHeaderFonts[1]!.name);
    expect(props.setSelectedCoverHeadingFont as jest.Mock).toHaveBeenCalledWith(
      mockHeaderFonts[1]!.name,
    );

    const bodySelect = screen.getByLabelText("Body Font") as HTMLSelectElement;
    await user.selectOptions(bodySelect, mockBodyFonts[1]!.name);
    expect(props.setSelectedCoverBodyFont as jest.Mock).toHaveBeenCalledWith(
      mockBodyFonts[1]!.name,
    );

    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("typing in recipient and textareas shows Save Change", async () => {
    renderComponent();

    const recipient = screen.getByLabelText(
      "Recipient Title",
    ) as HTMLInputElement;
    await user.clear(recipient);
    await user.type(recipient, "Dear Team");

    const introStart = screen.getByLabelText(
      "Intro Start",
    ) as HTMLTextAreaElement;
    await user.clear(introStart);
    await user.type(introStart, "Intro text");

    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("submits form and calls updateYourCoverLetterStyle with FormData", async () => {
    (actions.updateYourCoverLetterStyle as jest.Mock).mockResolvedValueOnce({});

    renderComponent();

    const recipient = screen.getByLabelText(
      "Recipient Title",
    ) as HTMLInputElement;
    await user.clear(recipient);
    await user.type(recipient, "Dear Team");

    const saveButton = screen.getByRole("button", { name: /save change/i });
    await user.click(saveButton);

    await waitFor(() =>
      expect(actions.updateYourCoverLetterStyle).toHaveBeenCalledWith(
        expect.any(FormData),
      ),
    );

    const formData: FormData = (actions.updateYourCoverLetterStyle as jest.Mock)
      .mock.calls[0][0];
    expect(formData.get("cover_id")).toBe(mockCoverLetter.id);
    expect(formData.get("recipient_title")).toBe("Dear Team");
  });

  it("logs error when updateYourCoverLetterStyle returns errors", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (actions.updateYourCoverLetterStyle as jest.Mock).mockResolvedValueOnce({
      errors: ["failed"],
    });

    renderComponent();

    const recipient = screen.getByLabelText(
      "Recipient Title",
    ) as HTMLInputElement;
    await user.clear(recipient);
    await user.type(recipient, "Dear Team");

    const saveButton = screen.getByRole("button", { name: /save change/i });
    await user.click(saveButton);

    await waitFor(() =>
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Update cover letter style failed:",
        expect.objectContaining({ errors: ["failed"] }),
      ),
    );

    consoleErrorSpy.mockRestore();
  });
});
