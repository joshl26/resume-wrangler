// app/ui/forms/__tests__/register-user.test.tsx
/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterUser from "../register-user";
import { CreateNewUser } from "@/app/lib/actions";
import * as nextAuthReact from "next-auth/react";

// Mock the actions module
jest.mock("@/app/lib/actions", () => ({
  CreateNewUser: jest.fn(),
}));

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("RegisterUser", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the register form", () => {
    render(<RegisterUser />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up with google/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows username validation hints when invalid", async () => {
    render(<RegisterUser />);

    const usernameInput = screen.getByLabelText("Username");
    await user.type(usernameInput, "abc"); // short username => invalid

    // The validation block should be visible and items present.
    expect(screen.getByText(/A valid username will:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Have six to twenty characters/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Contain only A-Z, a-z and 0-9 characters/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Not contain spaces or special characters/i),
    ).toBeInTheDocument();
  });

  it("hides username validation hints when valid", async () => {
    render(<RegisterUser />);

    const usernameInput = screen.getByLabelText("Username");
    await user.type(usernameInput, "validuser123"); // valid

    expect(
      screen.queryByText(/A valid username will:/i),
    ).not.toBeInTheDocument();
  });

  it("shows email field when username valid and accepts input", async () => {
    render(<RegisterUser />);

    const usernameInput = screen.getByLabelText("Username");
    await user.type(usernameInput, "validuser123");

    const emailInput = await screen.findByLabelText("Email");
    await user.type(emailInput, "invalid-email");

    // No explicit email validation message in component; just assert it's rendered and has value
    expect(emailInput).toBeInTheDocument();
    expect((emailInput as HTMLInputElement).value).toBe("invalid-email");
  });

  it("shows password validation hints when invalid", async () => {
    render(<RegisterUser />);

    const usernameInput = screen.getByLabelText("Username");
    await user.type(usernameInput, "validuser123");

    const emailInput = await screen.findByLabelText("Email");
    await user.type(emailInput, "test@example.com");

    const passwordInput = await screen.findByLabelText("Password");
    await user.type(passwordInput, "weak"); // invalid password

    expect(screen.getByText(/A valid password will:/i)).toBeInTheDocument();
    // Check that the password rule items exist — avoid brittle color checks
    expect(
      screen.getByText(/Contain at least one upper case A-Z/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Contain at least one lower case a-z/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/At least one digit from 0-9/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/At least one special character/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Minimum six, to max twenty characters/i),
    ).toBeInTheDocument();
  });

  it("shows submit button when all validations pass", async () => {
    render(<RegisterUser />);

    const usernameInput = screen.getByLabelText("Username");
    await user.type(usernameInput, "validuser123");

    const emailInput = await screen.findByLabelText("Email");
    await user.type(emailInput, "test@example.com");

    const passwordInput = await screen.findByLabelText("Password");
    await user.type(passwordInput, "ValidPass1!");

    expect(
      screen.getByRole("button", { name: /register new user/i }),
    ).toBeInTheDocument();
  });

  it("submits form successfully and resets state", async () => {
    (CreateNewUser as jest.Mock).mockResolvedValueOnce({});

    render(<RegisterUser />);

    const usernameInput = screen.getByLabelText("Username");
    await user.type(usernameInput, "validuser123");

    const emailInput = await screen.findByLabelText("Email");
    await user.type(emailInput, "test@example.com");

    const passwordInput = await screen.findByLabelText("Password");
    await user.type(passwordInput, "ValidPass1!");

    await user.click(
      screen.getByRole("button", { name: /register new user/i }),
    );

    await waitFor(() => expect(CreateNewUser).toHaveBeenCalled());

    // username input should be cleared
    expect((usernameInput as HTMLInputElement).value).toBe("");

    // email/password are conditionally unmounted (component resets validation),
    // so assert they are not present
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Password")).not.toBeInTheDocument();

    // Because component resets validation state, username hint is shown again (username is empty => invalid)
    expect(screen.getByText(/A valid username will:/i)).toBeInTheDocument();
  });

  it("displays error message on submission failure", async () => {
    (CreateNewUser as jest.Mock).mockResolvedValueOnce({
      errors: true,
      message: "Username already taken",
    });

    render(<RegisterUser />);

    const usernameInput = screen.getByLabelText("Username");
    await user.type(usernameInput, "takenuser");

    const emailInput = await screen.findByLabelText("Email");
    await user.type(emailInput, "test@example.com");

    const passwordInput = await screen.findByLabelText("Password");
    await user.type(passwordInput, "ValidPass1!");

    await user.click(
      screen.getByRole("button", { name: /register new user/i }),
    );

    await waitFor(() => expect(CreateNewUser).toHaveBeenCalled());

    expect(screen.getByText("Username already taken")).toBeInTheDocument();
  });

  it("handles unexpected error during submission", async () => {
    (CreateNewUser as jest.Mock).mockRejectedValueOnce(
      new Error("Network error"),
    );

    render(<RegisterUser />);

    const usernameInput = screen.getByLabelText("Username");
    await user.type(usernameInput, "validuser123");

    const emailInput = await screen.findByLabelText("Email");
    await user.type(emailInput, "test@example.com");

    const passwordInput = await screen.findByLabelText("Password");
    await user.type(passwordInput, "ValidPass1!");

    await user.click(
      screen.getByRole("button", { name: /register new user/i }),
    );

    await waitFor(() => expect(CreateNewUser).toHaveBeenCalled());

    expect(
      screen.getByText("Unexpected error. Please try again."),
    ).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    render(<RegisterUser />);

    const usernameInput = screen.getByLabelText("Username");
    await user.type(usernameInput, "validuser123");

    const emailInput = await screen.findByLabelText("Email");
    await user.type(emailInput, "test@example.com");

    const passwordInput = await screen.findByLabelText("Password");
    await user.type(passwordInput, "ValidPass1!");

    const eyeIcon = screen.getByTestId("eye-icon");
    expect(eyeIcon).toBeInTheDocument();

    await user.click(eyeIcon);

    expect(screen.getByTestId("eye-slash-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("eye-icon")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("eye-slash-icon"));

    expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("eye-slash-icon")).not.toBeInTheDocument();
  });

  it("handles Google signup", async () => {
    (nextAuthReact.signIn as jest.Mock).mockResolvedValueOnce({});

    render(<RegisterUser />);

    await user.click(
      screen.getByRole("button", { name: /sign up with google/i }),
    );

    expect(nextAuthReact.signIn).toHaveBeenCalledWith("google", {
      callbackUrl: "/dashboard",
    });
  });
});
