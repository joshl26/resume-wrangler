/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

/**
 * Mocks - MUST be declared before importing the component under test
 */

// Mock the updateUserEducation action
jest.mock("@/app/lib/actions", () => ({
  __esModule: true,
  updateUserEducation: jest.fn().mockResolvedValue({}),
}));

// Mock SubmitButton to render a real button and forward props
jest.mock("../../submit-button", () => ({
  __esModule: true,
  SubmitButton: ({ children, className, disabled, ...props }: any) => (
    <button
      data-testid="submit-button"
      type="submit"
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock BackButton
jest.mock("../../back-button", () => ({
  __esModule: true,
  default: ({ children, className, href }: any) => (
    <a data-testid="back-button" className={className} href={href}>
      {children}
    </a>
  ),
}));

import EditEducation from "../edit-education";

describe("EditEducation", () => {
  const baseEducation = {
    id: "edu-1",
    institution_name: "University of Example",
    location: "Example City",
    start_date: "2015-09-01",
    end_date: "2019-05-15",
    grade: "3.8 GPA",
    program: "Computer Science",
    url: "https://uni.example.edu",
  };

  it("renders form with default values and hidden inputs", () => {
    const { container } = render(
      <EditEducation education={baseEducation as any} />,
    );

    // Back button present and correct href
    const back = screen.getByTestId("back-button");
    expect(back).toBeInTheDocument();
    expect(back).toHaveAttribute("href", "/dashboard/education/");

    // Heading
    expect(screen.getByText("Edit Education Experience")).toBeInTheDocument();

    // Hidden inputs: education_id and resume_id
    const eduId = container.querySelector<HTMLInputElement>("#education_id");
    expect(eduId).toBeInTheDocument();
    expect(eduId).toHaveValue(baseEducation.id);

    const resumeId = container.querySelector<HTMLInputElement>("#resume_id");
    expect(resumeId).toBeInTheDocument();
    expect(resumeId).toHaveValue("blank");

    // Input default values
    const institution = screen.getByLabelText(
      "Institution Name",
    ) as HTMLInputElement;
    expect(institution).toBeInTheDocument();
    expect(institution).toHaveValue(baseEducation.institution_name);

    const location = screen.getByLabelText("Location") as HTMLInputElement;
    expect(location).toHaveValue(baseEducation.location);

    const startDate = screen.getByLabelText("Start Date") as HTMLInputElement;
    expect(startDate).toHaveValue(baseEducation.start_date);

    const endDate = screen.getByLabelText("End Date") as HTMLInputElement;
    expect(endDate).toHaveValue(baseEducation.end_date);

    const grade = screen.getByLabelText("Grade") as HTMLInputElement;
    expect(grade).toHaveValue(baseEducation.grade);

    const program = screen.getByLabelText("Program") as HTMLInputElement;
    expect(program).toHaveValue(baseEducation.program);

    const url = screen.getByLabelText("Link (Web URL)") as HTMLInputElement;
    expect(url).toHaveValue(baseEducation.url);

    // Initially edited is false -> SubmitButton should NOT be rendered
    expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();

    // Container classes
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass("px-4");
  });

  it("shows the SubmitButton after changing an input (e.g., institution name)", () => {
    render(<EditEducation education={baseEducation as any} />);

    const institution = screen.getByLabelText(
      "Institution Name",
    ) as HTMLInputElement;
    fireEvent.change(institution, { target: { value: "New University Name" } });

    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Save Updates");
    expect(submit).not.toBeDisabled();
  });

  it("shows the SubmitButton after changing another input (e.g., program)", () => {
    render(<EditEducation education={baseEducation as any} />);

    const program = screen.getByLabelText("Program") as HTMLInputElement;
    fireEvent.change(program, { target: { value: "Software Engineering" } });

    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Save Updates");
  });
});
