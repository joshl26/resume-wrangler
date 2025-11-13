/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YourProfile from "../your-profile";
import * as actions from "@/app/lib/actions";
// import the named export so Jest can mock it below
import { useFormState as useFormStateMock } from "react-dom";

/**
 * Mocks
 */
// mock the updateUser action
jest.mock("@/app/lib/actions", () => ({
  updateUser: jest.fn(),
}));

// next/image -> render a plain <img /> for tests
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// SubmitButton -> simple button (submit by default)
jest.mock("@/app/ui/submit-button", () => ({
  SubmitButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// IMPORTANT: preserve the actual react-dom module and override only useFormState
jest.mock("react-dom", () => {
  const actual = jest.requireActual("react-dom");
  return {
    ...actual,
    useFormState: jest.fn(),
  };
});

describe("YourProfile", () => {
  const user = userEvent.setup();

  const mockUser = {
    id: "user1",
    name: "testuser",
    email: "test@example.com",
    first_name: "John",
    last_name: "Doe",
    address_one: "City, State",
    address_two: "123 Main St",
    address_three: "Apt 4",
    phone: "111-222-3333",
    website: "https://example.com",
    thumbnail: "/avatar.png",
    access_level: "user",
    country: "USA",
  } as any;

  const mockResume = {
    id: "resume1",
  } as any;

  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // set the mocked useFormState return
    (useFormStateMock as jest.Mock).mockReturnValue([
      { message: "", errors: {} },
      dispatchMock,
    ]);
  });

  it("renders section title, profile image and Update Image link (when not template)", () => {
    const { container } = render(
      <YourProfile user={mockUser} resume={mockResume} />,
    );

    expect(screen.getByText(/Your Profile/i)).toBeInTheDocument();

    const img = container.querySelector("img") as HTMLImageElement | null;
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockUser.thumbnail);

    expect(screen.getByRole("link", { name: /Update Image/i })).toHaveAttribute(
      "href",
      "/dashboard/user-profile/",
    );
  });

  it("typing into fields sets edited state (Save Change button appears) and FormData contains updated values", async () => {
    const { container } = render(
      <YourProfile user={mockUser} resume={mockResume} />,
    );

    const firstNameInput = screen.getByPlaceholderText(
      "First Name",
    ) as HTMLInputElement;
    await user.clear(firstNameInput);
    await user.type(firstNameInput, "Jane");

    expect(
      screen.getByRole("button", { name: /Save Change/i }),
    ).toBeInTheDocument();

    const form = container.querySelector("form") as HTMLFormElement;
    const fd = new FormData(form);
    expect(fd.get("resume_id")).toBe(mockResume.id);
    expect(fd.get("name")).toBe(mockUser.name);
    expect(fd.get("first_name")).toBe("Jane");
  });

  it("shows validation errors and message when useFormState provides them", () => {
    (useFormStateMock as jest.Mock).mockReturnValue([
      {
        message: "Top-level error",
        errors: {
          first_name: ["First name is required"],
          last_name: ["Last name is invalid"],
        },
      },
      dispatchMock,
    ]);

    render(<YourProfile user={mockUser} resume={mockResume} />);

    expect(screen.getByText("Top-level error")).toBeInTheDocument();
    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Last name is invalid")).toBeInTheDocument();
  });

  it("manually calling updateUser with form data works (expected payload shape)", async () => {
    (actions.updateUser as jest.Mock).mockResolvedValue({});

    const { container } = render(
      <YourProfile user={mockUser} resume={mockResume} />,
    );

    const firstNameInput = screen.getByPlaceholderText(
      "First Name",
    ) as HTMLInputElement;
    await user.clear(firstNameInput);
    await user.type(firstNameInput, "Jordan");

    const form = container.querySelector("form") as HTMLFormElement;
    const fd = new FormData(form);

    await (actions.updateUser as jest.Mock)(mockUser.id, fd);

    expect(actions.updateUser).toHaveBeenCalledWith(mockUser.id, fd);
    expect(fd.get("first_name")).toBe("Jordan");
    expect(fd.get("resume_id")).toBe(mockResume.id);
  });
});
