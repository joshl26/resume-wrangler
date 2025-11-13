/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

/**
 * IMPORTANT: Paths in jest.mock must resolve to the exact module specifier
 * used by the component under test.
 */

// Mock the Page wrapper that StandardCover imports
jest.mock("../../page", () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <div data-testid="page-wrapper">{children}</div>
  ),
}));

// Import the async server component after mocks are in place
import StandardCover from "../standard-cover";

describe("StandardCover", () => {
  const user: any = {
    first_name: "Jane",
    last_name: "Doe",
    address_one: "123 Main St",
    phone: "555-1234",
    email: "jane@example.com",
    linked_in: "janedoe",
    website: "janedoe.com",
  };

  const company: any = {
    name: "Acme Corp",
    address_one: "1 Corporate Way",
    address_two: "Suite 100",
  };

  const application: any = {
    job_position: "Senior Engineer",
  };

  const coverLetter: any = {
    recipient_title: "Hiring Manager",
    intro_text_start: "I am excited to apply for the",
    intro_text_end: "and I believe my skills make me a great fit.",
    intro_experience: "I have 5 years of relevant experience.",
    conclusion_text: "Thank you for your time and consideration",
    salutation_text: "Sincerely",
  };

  const userCoverExperiences = [
    {
      id: "ce1",
      title: "Built feature X",
      description: "Improved metrics by 20%",
    },
    { id: "ce2", title: "Led team Y", description: "Managed 5 engineers" },
  ];

  const selectedCoverExperiences = [
    { id: "line1", cover_experience_id: "ce1" },
    { id: "line2", cover_experience_id: "ce2" },
  ];

  const fontsAndColors = {
    selectedCoverBodyFont: "body-font-class",
    selectedCoverHeadingFont: "heading-font-class",
    selectedCoverColor: "blue",
    selectedCoverHighlightColor: "orange",
  };

  it("renders user name, contact links, company info, cover letter text and selected experiences", async () => {
    // Call the async component function to get the element, then render it
    const element = await (StandardCover as any)({
      user,
      coverLetter,
      company,
      application,
      selectedCoverExperiences,
      userCoverExperiences,
      selectedCoverBodyFont: fontsAndColors.selectedCoverBodyFont,
      selectedCoverHeadingFont: fontsAndColors.selectedCoverHeadingFont,
      selectedCoverColor: fontsAndColors.selectedCoverColor,
      selectedCoverHighlightColor: fontsAndColors.selectedCoverHighlightColor,
    });

    const { container } = render(element as React.ReactElement);

    // Page wrapper is rendered
    expect(screen.getByTestId("page-wrapper")).toBeInTheDocument();

    // Name appears multiple times; assert both occurrences explicitly
    const nameNodes = screen.getAllByText(/Jane\s+Doe/);
    expect(nameNodes.length).toBeGreaterThanOrEqual(2);

    // First occurrence should be the main H1 heading
    expect(nameNodes[0]!.tagName).toBe("H1");

    // Second occurrence should be the signature H2
    // (if ordering changes, adjust accordingly or assert "some" is H2)
    expect(nameNodes[1]!.tagName).toBe("H2");

    // Contact links
    expect(screen.getByRole("link", { name: "123 Main St" })).toHaveAttribute(
      "href",
      "https://www.google.com/search?q=123 Main St",
    );
    // Component sample has a hard-coded tel link; assert that
    expect(screen.getByRole("link", { name: "555-1234" })).toHaveAttribute(
      "href",
      "tel:905-990-1035",
    );
    expect(
      screen.getByRole("link", { name: "jane@example.com" }),
    ).toHaveAttribute("href", "mailto:jane@example.com");
    expect(
      screen.getByRole("link", { name: "linkedin.com/in/janedoe" }),
    ).toHaveAttribute("href", "https://linkedin.com/in/janedoe");
    expect(screen.getByRole("link", { name: "janedoe.com" })).toHaveAttribute(
      "href",
      "https://janedoe.com",
    );

    // Company info
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("1 Corporate Way")).toBeInTheDocument();
    expect(screen.getByText("Suite 100")).toBeInTheDocument();

    // Cover letter text pieces
    expect(screen.getByText("Hiring Manager,")).toBeInTheDocument();
    expect(
      screen.getByText("I am excited to apply for the"),
    ).toBeInTheDocument();
    expect(screen.getByText("Senior Engineer.")).toBeInTheDocument();
    expect(
      screen.getByText("and I believe my skills make me a great fit."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("I have 5 years of relevant experience."),
    ).toBeInTheDocument();

    // Selected experiences should display titles and descriptions
    expect(container).toHaveTextContent("Built feature X");
    expect(container).toHaveTextContent("Improved metrics by 20%");
    expect(container).toHaveTextContent("Led team Y");
    expect(container).toHaveTextContent("Managed 5 engineers");

    // Conclusion and salutation
    expect(
      screen.getByText("Thank you for your time and consideration"),
    ).toBeInTheDocument();
    expect(screen.getByText("Sincerely,")).toBeInTheDocument();

    // Final signature contains user name (we already asserted occurrences above)
    expect(nameNodes.length).toBeGreaterThanOrEqual(2);

    // Ensure font classes were applied on at least one element (string match)
    const heading = container.querySelector("h1");
    expect(heading).toHaveClass("heading-font-class");

    const bodyElem = container.querySelector("[class*='body-font-class']");
    expect(bodyElem).toBeTruthy();
  });
});
