/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

/**
 * Mocks - must be declared before importing the component under test
 */

// Mock the updateUserCertfication action so the module exists and can be spied on if needed
jest.mock("@/app/lib/actions", () => ({
  __esModule: true,
  updateUserCertfication: jest.fn().mockResolvedValue({}),
}));

// Mock SubmitButton to render a real <button /> and forward disabled/className/children props
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

// Mock BackButton so we can assert it renders and exposes href/children
jest.mock("../../back-button", () => ({
  __esModule: true,
  default: ({ children, className, href }: any) => (
    <a data-testid="back-button" className={className} href={href}>
      {children}
    </a>
  ),
}));

import EditCertification from "../edit-certification";

describe("EditCertification", () => {
  const baseCertification = {
    id: "cert-1",
    name: "Awesome Cert",
    location: "Remote",
  };

  it("renders form with default values and static UI pieces", () => {
    const { container } = render(
      <EditCertification certification={baseCertification as any} />,
    );

    // Back button present and points to the certifications list
    const back = screen.getByTestId("back-button");
    expect(back).toBeInTheDocument();
    expect(back).toHaveAttribute("href", "/dashboard/certifications/");

    // Heading
    expect(screen.getByText("Edit Certification")).toBeInTheDocument();

    // Hidden certification_id input
    const certIdInput =
      container.querySelector<HTMLInputElement>("#certification_id");
    expect(certIdInput).toBeInTheDocument();
    expect(certIdInput).toHaveValue(baseCertification.id);

    // The visible certification name input has default value
    const certNameInput = screen.getByLabelText(
      "Certification Name",
    ) as HTMLInputElement;
    expect(certNameInput).toBeInTheDocument();
    expect(certNameInput).toHaveValue(baseCertification.name);

    // Location input has default value
    const locationInput = screen.getByLabelText("Location") as HTMLInputElement;
    expect(locationInput).toBeInTheDocument();
    expect(locationInput).toHaveValue(baseCertification.location);

    // Initially edited is false -> SubmitButton should NOT be in the document
    expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();

    // Container classes
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass("px-3");
  });

  it("shows the SubmitButton after editing inputs", () => {
    render(<EditCertification certification={baseCertification as any} />);

    // Change certification name
    const certNameInput = screen.getByLabelText(
      "Certification Name",
    ) as HTMLInputElement;
    fireEvent.change(certNameInput, { target: { value: "Even Better Cert" } });

    // Submit button appears
    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Save Updates");
    // Should not be disabled initially
    expect(submit).not.toBeDisabled();
  });

  it("shows the SubmitButton after editing the location input as well", () => {
    render(<EditCertification certification={baseCertification as any} />);

    const locationInput = screen.getByLabelText("Location") as HTMLInputElement;
    fireEvent.change(locationInput, { target: { value: "Onsite" } });

    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Save Updates");
  });
});
