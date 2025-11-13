/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

/**
 * Mocks - MUST be declared before importing the component under test
 */

// Mock the updateUserWorkExperience action
jest.mock("@/app/lib/actions", () => ({
  __esModule: true,
  updateUserWorkExperience: jest.fn().mockResolvedValue({}),
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

import EditWorkExperience from "../edit-work-experience";

describe("EditWorkExperience", () => {
  const baseWorkExperience = {
    id: "we-1",
    company_name: "Example Co",
    location: "Townsville",
    start_date: "2018-01-01",
    end_date: "2020-12-31",
    job_title: "Engineer",
    description_one: "Did engineering things.",
    description_two: "More responsibilities.",
    description_three: "Led a small team.",
    description_four: "Mentored interns.",
  };

  it("renders form with default values and hidden inputs", () => {
    const { container } = render(
      <EditWorkExperience workExperience={baseWorkExperience as any} />,
    );

    // Back button present and correct href
    const back = screen.getByTestId("back-button");
    expect(back).toBeInTheDocument();
    expect(back).toHaveAttribute("href", "/dashboard/work-experience");

    // Heading
    expect(screen.getByText("Edit Work Experience")).toBeInTheDocument();

    // Hidden inputs: experience_id and resume_id
    const expId = container.querySelector<HTMLInputElement>("#experience_id");
    expect(expId).toBeInTheDocument();
    expect(expId).toHaveValue(baseWorkExperience.id);

    const resumeId = container.querySelector<HTMLInputElement>("#resume_id");
    expect(resumeId).toBeInTheDocument();
    expect(resumeId).toHaveValue("blank");

    // Input default values
    const companyName = screen.getByLabelText(
      "Company Name",
    ) as HTMLInputElement;
    expect(companyName).toBeInTheDocument();
    expect(companyName).toHaveValue(baseWorkExperience.company_name);

    const location = screen.getByLabelText("Location") as HTMLInputElement;
    expect(location).toHaveValue(baseWorkExperience.location);

    const startDate = screen.getByLabelText("Start Date") as HTMLInputElement;
    expect(startDate).toHaveValue(baseWorkExperience.start_date);

    const endDate = screen.getByLabelText("End Date") as HTMLInputElement;
    expect(endDate).toHaveValue(baseWorkExperience.end_date);

    const jobTitle = screen.getByLabelText("Job Title") as HTMLInputElement;
    expect(jobTitle).toHaveValue(baseWorkExperience.job_title);

    const descOne = screen.getByLabelText(
      "Description One",
    ) as HTMLTextAreaElement;
    expect(descOne).toHaveValue(baseWorkExperience.description_one);

    const descTwo = screen.getByLabelText(
      "Description Two",
    ) as HTMLTextAreaElement;
    expect(descTwo).toHaveValue(baseWorkExperience.description_two);

    const descThree = screen.getByLabelText(
      "Description Three",
    ) as HTMLTextAreaElement;
    expect(descThree).toHaveValue(baseWorkExperience.description_three);

    const descFour = screen.getByLabelText(
      "Description Four",
    ) as HTMLTextAreaElement;
    expect(descFour).toHaveValue(baseWorkExperience.description_four);

    // Initially edited is false -> SubmitButton should NOT be rendered
    expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();

    // Root container classes
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass("px-4", "pb-4");
  });

  it("shows the SubmitButton after changing a text input (company_name)", () => {
    render(<EditWorkExperience workExperience={baseWorkExperience as any} />);

    const companyName = screen.getByLabelText(
      "Company Name",
    ) as HTMLInputElement;
    fireEvent.change(companyName, { target: { value: "New Example Co" } });

    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Update Work Experience");
    expect(submit).not.toBeDisabled();
  });

  it("shows the SubmitButton after changing a textarea (description_one)", () => {
    render(<EditWorkExperience workExperience={baseWorkExperience as any} />);

    const descOne = screen.getByLabelText(
      "Description One",
    ) as HTMLTextAreaElement;
    fireEvent.change(descOne, {
      target: { value: "Updated description content." },
    });

    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Update Work Experience");
  });
});
