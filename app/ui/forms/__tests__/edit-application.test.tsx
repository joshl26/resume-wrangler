/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

/**
 * Mocks - must be declared before importing the component under test
 */

// Mock the updateApplication action (we won't assert it's called because the form uses the `action` prop)
jest.mock("@/app/lib/actions", () => ({
  __esModule: true,
  updateApplication: jest.fn(),
}));

// Mock SubmitButton to render a real <button type="submit" /> so we can trigger form submits if needed
jest.mock("../../submit-button", () => ({
  __esModule: true,
  SubmitButton: ({ children, className }: any) => (
    <button type="submit" data-testid="submit-button" className={className}>
      {children}
    </button>
  ),
}));

// Mock BackButton so it renders its children (we assert presence)
jest.mock("../../back-button", () => ({
  __esModule: true,
  default: ({ children, className, href }: any) => (
    <a data-testid="back-button" className={className} href={href}>
      {children}
    </a>
  ),
}));

import EditApplication from "../edit-application";

describe("EditApplication", () => {
  const baseApplication = {
    id: "app-1",
    company_id: "c-2",
    is_complete: "false",
    date_submitted: null,
    job_position: "Frontend Engineer",
    posting_url: "https://example.com/job/1",
    posting_text: "This is the posting text",
    analyzed_posting_text: "Analyzed text",
    created_at: new Date("2020-01-01T00:00:00Z"),
    updated_at: new Date("2020-02-01T12:34:56Z"),
  };

  const companies = [
    { id: "c-1", name: "Company One" },
    { id: "c-2", name: "Company Two" },
    { id: "c-3", name: "Company Three" },
  ];

  it("renders form with default values and static UI pieces", () => {
    const { container } = render(
      <EditApplication
        application={baseApplication as any}
        companies={companies as any}
      />,
    );

    // Back button present
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
    expect(screen.getByTestId("back-button")).toHaveAttribute(
      "href",
      "/dashboard/applications/",
    );

    // Heading
    expect(screen.getByText("Edit Application")).toBeInTheDocument();

    // Company select has the application's company selected
    const select = screen.getByLabelText(
      "Select a Company",
    ) as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.value).toBe(baseApplication.company_id);

    // Job position input defaultValue
    const jobInput = screen.getByLabelText("Job Position") as HTMLInputElement;
    expect(jobInput).toBeInTheDocument();
    expect(jobInput).toHaveValue(baseApplication.job_position);

    // Posting Url
    const postingUrl = screen.getByLabelText("Posting Url") as HTMLInputElement;
    expect(postingUrl).toBeInTheDocument();
    expect(postingUrl).toHaveValue(baseApplication.posting_url);

    // Posting Text and Analyzed Posting Text (textarea)
    const postingText = screen.getByLabelText(
      "Posting Text",
    ) as HTMLTextAreaElement;
    expect(postingText).toBeInTheDocument();
    expect(postingText).toHaveValue(baseApplication.posting_text);

    const analyzedText = screen.getByLabelText(
      "Analyzed Posting Text",
    ) as HTMLTextAreaElement;
    expect(analyzedText).toBeInTheDocument();
    expect(analyzedText).toHaveValue(baseApplication.analyzed_posting_text);

    // Date submitted area shows "Not submitted yet" when null
    expect(screen.getByText("Not submitted yet")).toBeInTheDocument();

    // Created and Updated date slices
    const expectedCreated = baseApplication.created_at.toString().slice(0, 24);
    const expectedUpdated = baseApplication.updated_at.toString().slice(0, 24);
    expect(screen.getByText(expectedCreated)).toBeInTheDocument();
    expect(screen.getByText(expectedUpdated)).toBeInTheDocument();

    // Initially edited is false -> SubmitButton should NOT be in the document
    expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();

    // Container classes
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass("px-4");
  });

  it("marks form as edited when inputs change and shows the SubmitButton", () => {
    render(
      <EditApplication
        application={baseApplication as any}
        companies={companies as any}
      />,
    );

    // Change job position input
    const jobInput = screen.getByLabelText("Job Position") as HTMLInputElement;
    fireEvent.change(jobInput, { target: { value: "Backend Engineer" } });

    // Submit button should now appear
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("toggles the is_complete state and updates hidden input value when checkbox clicked", () => {
    const { container } = render(
      <EditApplication
        application={baseApplication as any}
        companies={companies as any}
      />,
    );

    // Hidden readOnly input that mirrors isComplete -> select by id to avoid ambiguity
    const hiddenInput =
      container.querySelector<HTMLInputElement>("#is_complete");
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute("id", "is_complete");
    expect(hiddenInput).toHaveValue("false");

    // Get the visible checkbox by role (there should be exactly one checkbox)
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);

    // Click checkbox to change to checked -> hidden input value becomes "true"
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // Hidden input's value should update to "true"
    expect(hiddenInput).toHaveValue("true");

    // Clicking checkbox also sets edited -> SubmitButton appears
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });
  it("changing the select triggers edited state and shows SubmitButton", () => {
    render(
      <EditApplication
        application={baseApplication as any}
        companies={companies as any}
      />,
    );

    const select = screen.getByLabelText(
      "Select a Company",
    ) as HTMLSelectElement;
    expect(select.value).toBe("c-2");

    // Change to a different company
    fireEvent.change(select, { target: { value: "c-3" } });
    expect(select.value).toBe("c-3");

    // Submit button should appear due to edit
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });
});
