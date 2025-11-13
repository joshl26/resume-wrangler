/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

/**
 * Mocks - declare BEFORE importing the component under test
 */

// Mock the updateCompany action so it exists for the component import
jest.mock("@/app/lib/actions", () => ({
  __esModule: true,
  updateCompany: jest.fn().mockResolvedValue({}),
}));

// Mock SubmitButton to render a real button so we can assert it appears
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

import EditCompany from "../edit-company";

describe("EditCompany", () => {
  const baseCompany = {
    id: "company-1",
    name: "ACME Corp",
    address_one: "123 Main St",
    address_two: "Suite 5",
    recipient_title: "Hiring Manager",
    email: "contact@acme.test",
    phone: "555-1234",
    website_url: "https://acme.test",
    created_at: new Date("2021-06-01T12:00:00Z"),
    updated_at: new Date("2021-07-02T15:30:00Z"),
  };

  it("renders the form with default values and static pieces", () => {
    const { container } = render(<EditCompany company={baseCompany as any} />);

    // Back button present and correct href
    const back = screen.getByTestId("back-button");
    expect(back).toBeInTheDocument();
    expect(back).toHaveAttribute("href", "/dashboard/companies/");

    // Heading
    expect(screen.getByText("Edit Company")).toBeInTheDocument();

    // Hidden company_id input
    const companyIdInput =
      container.querySelector<HTMLInputElement>("#company_id");
    expect(companyIdInput).toBeInTheDocument();
    expect(companyIdInput).toHaveValue(baseCompany.id);

    // Created and Updated date slices
    const expectedCreated = baseCompany.created_at.toString().slice(0, 24);
    const expectedUpdated = baseCompany.updated_at.toString().slice(0, 24);
    expect(screen.getByText(expectedCreated)).toBeInTheDocument();
    expect(screen.getByText(expectedUpdated)).toBeInTheDocument();

    // Inputs default values
    const companyName = screen.getByLabelText(
      "Company Name",
    ) as HTMLInputElement;
    expect(companyName).toBeInTheDocument();
    expect(companyName).toHaveValue(baseCompany.name);

    const addressOne = screen.getByLabelText("Address One") as HTMLInputElement;
    expect(addressOne).toHaveValue(baseCompany.address_one);

    const addressTwo = screen.getByLabelText("Address Two") as HTMLInputElement;
    expect(addressTwo).toHaveValue(baseCompany.address_two);

    const recipientTitle = screen.getByLabelText(
      "Recipient Title",
    ) as HTMLInputElement;
    expect(recipientTitle).toHaveValue(baseCompany.recipient_title);

    const email = screen.getByLabelText("Email") as HTMLInputElement;
    expect(email).toHaveValue(baseCompany.email);

    const phone = screen.getByLabelText("Phone") as HTMLInputElement;
    expect(phone).toHaveValue(baseCompany.phone);

    const website = screen.getByLabelText("Website Url") as HTMLInputElement;
    expect(website).toHaveValue(baseCompany.website_url);

    // Initially edited is false -> SubmitButton should NOT be present
    expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();

    // Root container presence
    const root = container.firstChild as HTMLElement;
    expect(root).toBeInTheDocument();
  });

  it("shows the SubmitButton after editing an input", () => {
    render(<EditCompany company={baseCompany as any} />);

    const companyName = screen.getByLabelText(
      "Company Name",
    ) as HTMLInputElement;
    fireEvent.change(companyName, { target: { value: "ACME International" } });

    // Submit button should now appear
    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Save Updates");
    expect(submit).not.toBeDisabled();
  });

  it("shows the SubmitButton after editing any other input (e.g., phone)", () => {
    render(<EditCompany company={baseCompany as any} />);

    const phone = screen.getByLabelText("Phone") as HTMLInputElement;
    fireEvent.change(phone, { target: { value: "555-9999" } });

    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Save Updates");
  });
});
