/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YourSocialLinks from "../your-social-links";
import * as actions from "@/app/lib/actions";
import type { Resume, User } from "@/app/lib/definitions";

// Mock the actions used by the component
jest.mock("@/app/lib/actions", () => ({
  updateSocials: jest.fn(),
}));

// Prepare mock state/dispatch for useFormState
const mockDispatch = jest.fn();
const mockFormState = { message: "initial", formData: null, errors: {} };

// Preserve the actual react-dom module but override useFormState only
jest.mock("react-dom", () => {
  const actual = jest.requireActual("react-dom") as any;
  return {
    ...actual,
    useFormState: jest.fn(() => [mockFormState, mockDispatch]),
  };
});

// Render SubmitButton as a plain button for tests
jest.mock("@/app/ui/submit-button", () => ({
  SubmitButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("YourSocialLinks", () => {
  const u = userEvent.setup();

  const mockUser: User = {
    id: "user1",
    name: "Test User",
    email: "test@example.com",
    linked_in: "linked_user",
    facebook: "fb_user",
    instagram: "insta_user",
    twitter: "tw_user",
    github: "gh_user",
  } as unknown as User;

  const mockResume: Resume = {
    id: "resume1",
    title: "Resume Title",
  } as unknown as Resume;

  const setShowSocials = jest.fn() as jest.MockedFunction<(e: string) => void>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders visible social inputs when showSocials is 'true' and hides when 'false'", () => {
    const { rerender } = render(
      <YourSocialLinks
        user={mockUser}
        resume={mockResume}
        showSocials={"true"}
        setShowSocials={setShowSocials}
      />,
    );

    // Visible inputs (labels exist)
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("Github")).toBeInTheDocument();

    // Values come from the user object (defaultValue)
    expect((screen.getByLabelText("LinkedIn") as HTMLInputElement).value).toBe(
      "linked_user",
    );
    expect((screen.getByLabelText("Github") as HTMLInputElement).value).toBe(
      "gh_user",
    );

    // When showSocials is false, inputs are hidden (labels not rendered)
    rerender(
      <YourSocialLinks
        user={mockUser}
        resume={mockResume}
        showSocials={"false"}
        setShowSocials={setShowSocials}
      />,
    );

    // The labeled inputs should not be present when showSocials is "false"
    expect(screen.queryByLabelText("LinkedIn")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Facebook")).not.toBeInTheDocument();

    // Hidden inputs still exist with values (they are in the DOM but not labeled)
    const hiddenLinkedIn = screen.getByDisplayValue(
      "linked_user",
    ) as HTMLInputElement;
    expect(hiddenLinkedIn).toBeInTheDocument();
    // The hidden resume_id input should also be present
    expect(screen.getAllByDisplayValue("resume1").length).toBeGreaterThan(0);
  });

  it("typing into an input sets edited => Save Change button appears, submitting the form clears edited", async () => {
    render(
      <YourSocialLinks
        user={mockUser}
        resume={mockResume}
        showSocials={"true"}
        setShowSocials={setShowSocials}
      />,
    );

    const linkedInInput = screen.getByLabelText("LinkedIn") as HTMLInputElement;
    // change value to mark edited = true
    fireEvent.change(linkedInInput, { target: { value: "new_linked" } });

    // Save Change button should appear
    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();

    // Submit the form — this calls the onSubmit handler which sets edited false
    const form = linkedInInput.closest("form") as HTMLFormElement;
    if (!form) throw new Error("Form not found");
    fireEvent.submit(form);

    // After submit, Save Change should be gone
    expect(
      screen.queryByRole("button", { name: /save change/i }),
    ).not.toBeInTheDocument();
  });

  it("toggling the show_socials_input checkbox calls setShowSocials and shows Save Change", async () => {
    render(
      <YourSocialLinks
        user={mockUser}
        resume={mockResume}
        showSocials={"true"}
        setShowSocials={setShowSocials}
      />,
    );

    const checkbox = screen.getByTitle(
      "show_socials_input",
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    await u.click(checkbox);

    // setShowSocials should be called with "false"
    expect(setShowSocials).toHaveBeenCalledWith("false");

    // Edited should be true and Save Change should appear
    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("dispatch (useFormState) is provided to the form action (mocked) and can be called with FormData", async () => {
    render(
      <YourSocialLinks
        user={mockUser}
        resume={mockResume}
        showSocials={"true"}
        setShowSocials={setShowSocials}
      />,
    );

    // Make edited true so Save Change appears
    const fbInput = screen.getByLabelText("Facebook") as HTMLInputElement;
    fireEvent.change(fbInput, { target: { value: "new_fb" } });
    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();

    // Grab the form and create FormData to simulate submission to the dispatch/action
    const form = fbInput.closest("form") as HTMLFormElement;
    if (!form) throw new Error("Form not found");

    const fd = new FormData(form);
    // simulate calling the dispatch (action) that useFormState returned
    await (mockDispatch as jest.Mock)(fd);

    // Ensure our mocked dispatch was called
    expect(mockDispatch).toHaveBeenCalledWith(fd);
  });
});
