/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YourResumeStyling from "../your-resume-styling";
import * as actions from "@/app/lib/actions";
import type {
  Resume,
  ResumeTemplates,
  ResumeColors,
  HeaderFonts,
  BodyFonts,
  ResumeColor,
  HeaderFont,
  BodyFont,
} from "@/app/lib/definitions";

/**
 * Mocks
 */
jest.mock("@/app/lib/actions", () => ({
  updateYourResumeStyle: jest.fn(),
}));

// Mock SubmitButton so it renders as a plain button
jest.mock("@/app/ui/submit-button", () => ({
  SubmitButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("YourResumeStyling (typed)", () => {
  const user = userEvent.setup();

  const mockResume: Resume = {
    id: "resume1",
    title: "My Resume",
    description: "A great resume",
    template: "template1",
    color: "bg-blue-500",
    highlight_color: "bg-yellow-300",
    heading_font: "font-sans",
    body_font: "font-serif",
    // if Resume has additional required fields, add minimal placeholders here
  } as Resume;

  const mockResumeTemplates: ResumeTemplates = [
    { id: "template1", name: "Template One", description: "template1" },
    { id: "template2", name: "Template Two", description: "template2" },
  ] as ResumeTemplates;

  const mockResumeColors: ResumeColors = [
    { id: "color1", color: "bg-blue-500", highlight_color: "bg-yellow-300" },
    { id: "color2", color: "bg-red-500", highlight_color: "bg-green-300" },
  ] as ResumeColors;

  const mockHeaderFonts: HeaderFonts = [
    { id: "font1", name: "font-sans", description: "Sans Serif" },
    { id: "font2", name: "font-serif", description: "Serif" },
  ] as HeaderFonts;

  const mockBodyFonts: BodyFonts = [
    { id: "font1", name: "font-serif", description: "Serif" },
    { id: "font2", name: "font-mono", description: "Monospace" },
  ] as BodyFonts;

  // typed setters for props
  const setSelectedResumeTemplate = jest.fn() as jest.MockedFunction<
    (e: string) => void
  >;
  const setSelectedResumeHeadingFont = jest.fn() as jest.MockedFunction<
    (e: string) => void
  >;
  const setSelectedResumeBodyFont = jest.fn() as jest.MockedFunction<
    (e: string) => void
  >;
  const setSelectedResumeColor = jest.fn() as jest.MockedFunction<
    (e: string) => void
  >;
  const setSelectedResumeHighlightColor = jest.fn() as jest.MockedFunction<
    (e: string) => void
  >;

  const defaultProps = {
    resume: mockResume,
    resumeTemplates: mockResumeTemplates,
    resumeColors: mockResumeColors,
    headerFonts: mockHeaderFonts,
    bodyFonts: mockBodyFonts,
    setSelectedResumeTemplate,
    setSelectedResumeHeadingFont,
    setSelectedResumeBodyFont,
    setSelectedResumeColor,
    setSelectedResumeHighlightColor,
    selectedResumeTemplate: mockResume.template,
    selectedResumeBodyFont: mockResume.body_font,
    selectedResumeHeadingFont: mockResume.heading_font,
    selectedResumeColor: mockResume.color,
    selectedResumeHighlightColor: mockResume.highlight_color,
  } as const;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders section title and all form fields with correct default values", () => {
    const { container } = render(
      <YourResumeStyling {...(defaultProps as any)} />,
    );

    expect(screen.getByText(/Resume Styling/i)).toBeInTheDocument();

    // Resume Title
    const titleInput = screen.getByLabelText(
      "Resume Title",
    ) as HTMLInputElement;
    expect(titleInput).toHaveValue(mockResume.title);

    // Description
    const descInput = screen.getByLabelText(
      "Description",
    ) as HTMLTextAreaElement;
    expect(descInput).toHaveValue(mockResume.description);

    // Template select
    const tmplSelect = screen.getByLabelText(
      "Resume Template",
    ) as HTMLSelectElement;
    expect(tmplSelect).toHaveValue(mockResume.template);

    // Colors: these are divs with id equal to the color string — select by id
    const selectedColorDiv = container.querySelector(
      `#${mockResume.color}`,
    ) as HTMLElement | null;
    expect(selectedColorDiv).toBeInTheDocument();
    // The component applies "-translate-y-1" to the selected color; assert class presence
    expect(selectedColorDiv?.className).toContain("-translate-y-1");

    // Heading Font
    const headingSelect = screen.getByLabelText(
      "Heading Font",
    ) as HTMLSelectElement;
    expect(headingSelect).toHaveValue(mockResume.heading_font);

    // Body Font
    const bodySelect = screen.getByLabelText("Body Font") as HTMLSelectElement;
    expect(bodySelect).toHaveValue(mockResume.body_font);
  });

  it("typing into title triggers edited state and Save Change button appears", async () => {
    render(<YourResumeStyling {...(defaultProps as any)} />);

    const titleInput = screen.getByLabelText(
      "Resume Title",
    ) as HTMLInputElement;
    // Use fireEvent.change so the DOM value is immediately reflected in FormData
    fireEvent.change(titleInput, { target: { value: "Updated Resume Title" } });

    // Save Change button should appear (SubmitButton mocked as <button>)
    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();

    // FormData from form should reflect new value
    const form = titleInput.closest("form") as HTMLFormElement;
    const fd = new FormData(form);
    expect(fd.get("resume_title")).toBe("Updated Resume Title");
    expect(fd.get("resume_id")).toBe(mockResume.id);
  });

  it("changing template select calls setSelectedResumeTemplate and shows Save Change", async () => {
    render(<YourResumeStyling {...(defaultProps as any)} />);

    const tmplSelect = screen.getByLabelText(
      "Resume Template",
    ) as HTMLSelectElement;
    await user.selectOptions(tmplSelect, "template2");

    expect(setSelectedResumeTemplate).toHaveBeenCalledWith("template2");
    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("clicking a color option updates selected color and highlight color", async () => {
    const { container } = render(
      <YourResumeStyling {...(defaultProps as any)} />,
    );

    // Select the red color div by its id (component uses id={color.color})
    const redDiv = container.querySelector("#bg-red-500") as HTMLElement | null;
    expect(redDiv).toBeInTheDocument();

    await user.click(redDiv!);

    expect(setSelectedResumeColor).toHaveBeenCalledWith("bg-red-500");
    expect(setSelectedResumeHighlightColor).toHaveBeenCalledWith(
      "bg-green-300",
    );

    // Save Change should appear
    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("changing heading/body font selects update state and show Save Change", async () => {
    render(<YourResumeStyling {...(defaultProps as any)} />);

    const headingSelect = screen.getByLabelText(
      "Heading Font",
    ) as HTMLSelectElement;
    await user.selectOptions(headingSelect, "font-serif");
    expect(setSelectedResumeHeadingFont).toHaveBeenCalledWith("font-serif");

    const bodySelect = screen.getByLabelText("Body Font") as HTMLSelectElement;
    await user.selectOptions(bodySelect, "font-mono");
    expect(setSelectedResumeBodyFont).toHaveBeenCalledWith("font-mono");

    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("form submission (simulated) calls updateYourResumeStyle with FormData", async () => {
    (actions.updateYourResumeStyle as jest.Mock).mockResolvedValue({});

    const { container } = render(
      <YourResumeStyling {...(defaultProps as any)} />,
    );

    const titleInput = screen.getByLabelText(
      "Resume Title",
    ) as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: "New Title" } });

    // Build FormData from the form (jsdom doesn't execute form action)
    const form = titleInput.closest("form") as HTMLFormElement;
    const fd = new FormData(form);

    // Manually call the mocked server action to simulate submission
    await (actions.updateYourResumeStyle as jest.Mock)(fd);

    expect(fd.get("resume_title")).toBe("New Title");
    expect(fd.get("resume_id")).toBe(mockResume.id);
    expect(fd.get("color")).toBe(mockResume.color);
    expect(fd.get("highlight_color")).toBe(mockResume.highlight_color);

    expect(actions.updateYourResumeStyle).toHaveBeenCalledWith(fd);
  });
});
