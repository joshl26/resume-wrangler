/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

/**
 * Mocks - MUST be declared before importing the component under test
 */

// Mock the updateUserOrganization action
jest.mock("@/app/lib/actions", () => ({
  __esModule: true,
  updateUserOrganization: jest.fn().mockResolvedValue({}),
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

import EditOrganization from "../edit-organization";

describe("EditOrganization", () => {
  const baseOrganization = {
    id: "org-1",
    name: "Volunteer Org",
    location: "Cityville",
    start_date: "2020-01-01",
    end_date: "2022-12-31",
    description: "Helped with community outreach.",
  };

  it("renders form with default values and hidden inputs", () => {
    const { container } = render(
      <EditOrganization organization={baseOrganization as any} />,
    );

    // Back button present and correct href
    const back = screen.getByTestId("back-button");
    expect(back).toBeInTheDocument();
    expect(back).toHaveAttribute("href", "/dashboard/organizations/");

    // Heading
    expect(screen.getByText("Edit Organization")).toBeInTheDocument();

    // Hidden inputs: organization_id, resume_id, user_id
    const orgId = container.querySelector<HTMLInputElement>("#organization_id");
    expect(orgId).toBeInTheDocument();
    expect(orgId).toHaveValue(baseOrganization.id);

    const resumeId = container.querySelector<HTMLInputElement>("#resume_id");
    expect(resumeId).toBeInTheDocument();
    expect(resumeId).toHaveValue("blank");

    const userId = container.querySelector<HTMLInputElement>("#user_id");
    expect(userId).toBeInTheDocument();
    expect(userId).toHaveValue("blank");

    // Input default values
    const orgName = screen.getByLabelText(
      "Organization Name",
    ) as HTMLInputElement;
    expect(orgName).toBeInTheDocument();
    expect(orgName).toHaveValue(baseOrganization.name);

    const location = screen.getByLabelText("Location") as HTMLInputElement;
    expect(location).toHaveValue(baseOrganization.location);

    const startDate = screen.getByLabelText("Start Date") as HTMLInputElement;
    expect(startDate).toHaveValue(baseOrganization.start_date);

    const endDate = screen.getByLabelText("End Date") as HTMLInputElement;
    expect(endDate).toHaveValue(baseOrganization.end_date);

    const description = screen.getByLabelText(
      "Description",
    ) as HTMLTextAreaElement;
    expect(description).toHaveValue(baseOrganization.description);

    // Initially edited is false -> SubmitButton should NOT be rendered
    expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();

    // Container classes
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass("px-3");
  });

  it("shows the SubmitButton after changing an input (e.g., organization name)", () => {
    render(<EditOrganization organization={baseOrganization as any} />);

    const orgName = screen.getByLabelText(
      "Organization Name",
    ) as HTMLInputElement;
    fireEvent.change(orgName, { target: { value: "New Volunteer Org" } });

    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Save Updates");
    expect(submit).not.toBeDisabled();
  });

  it("shows the SubmitButton after changing another input (e.g., description)", () => {
    render(<EditOrganization organization={baseOrganization as any} />);

    const description = screen.getByLabelText(
      "Description",
    ) as HTMLTextAreaElement;
    fireEvent.change(description, {
      target: { value: "Updated description." },
    });

    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Save Updates");
  });
});
