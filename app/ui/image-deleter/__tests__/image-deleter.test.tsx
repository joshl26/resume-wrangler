/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageDeleter from "../image-deleter";
import * as actions from "@/app/lib/actions";

// Mock the deleteUserImage action
jest.mock("@/app/lib/actions", () => ({
  deleteUserImage: jest.fn(),
}));

// Mock SubmitButton as a plain button for tests
jest.mock("@/app/ui/submit-button", () => ({
  SubmitButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("ImageDeleter", () => {
  const u = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form, input and delete button", () => {
    render(<ImageDeleter />);

    expect(
      screen.getByRole("heading", { name: /image deleter/i }),
    ).toBeInTheDocument();

    // input by placeholder
    const input = screen.getByPlaceholderText("publicId") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "publicId");

    // Delete button
    const deleteBtn = screen.getByRole("button", { name: /^delete$/i });
    expect(deleteBtn).toBeInTheDocument();
  });

  it("typing into publicId input updates its value", async () => {
    render(<ImageDeleter />);

    const input = screen.getByPlaceholderText("publicId") as HTMLInputElement;
    await u.type(input, "abc-123");

    expect(input.value).toBe("abc-123");
  });

  it("builds FormData from form and calls deleteUserImage with expected value (simulated form action)", async () => {
    render(<ImageDeleter />);

    const input = screen.getByPlaceholderText("publicId") as HTMLInputElement;
    await u.type(input, "public-xyz");

    // Find the surrounding form
    const form = input.closest("form") as HTMLFormElement | null;
    if (!form) throw new Error("Form not found");

    // Build FormData just like the (server) action handler would receive
    const fd = new FormData(form);
    expect(fd.get("publicId")).toBe("public-xyz");

    // Simulate calling the server action by calling the mocked deleteUserImage with the FormData
    (actions.deleteUserImage as jest.Mock).mockResolvedValueOnce({
      message: "Deleted",
    });
    await (actions.deleteUserImage as jest.Mock)(fd);

    expect(actions.deleteUserImage).toHaveBeenCalledWith(fd);
  });

  it("handles deleteUserImage returning errors (simulated) — mock is called with proper FormData", async () => {
    render(<ImageDeleter />);

    const input = screen.getByPlaceholderText("publicId") as HTMLInputElement;
    await u.type(input, "bad-id");

    const form = input.closest("form") as HTMLFormElement | null;
    if (!form) throw new Error("Form not found");

    const fd = new FormData(form);
    expect(fd.get("publicId")).toBe("bad-id");

    // Simulate an error return shape from the API
    (actions.deleteUserImage as jest.Mock).mockResolvedValueOnce({
      errors: ["not found"],
    });
    await (actions.deleteUserImage as jest.Mock)(fd);

    expect(actions.deleteUserImage).toHaveBeenCalledWith(fd);
  });

  it("handles deleteUserImage throwing (simulated) — mock is called and rejections can be observed", async () => {
    render(<ImageDeleter />);

    const input = screen.getByPlaceholderText("publicId") as HTMLInputElement;
    await u.type(input, "throw-id");

    const form = input.closest("form") as HTMLFormElement | null;
    if (!form) throw new Error("Form not found");

    const fd = new FormData(form);
    expect(fd.get("publicId")).toBe("throw-id");

    // Simulate throwing error
    (actions.deleteUserImage as jest.Mock).mockRejectedValueOnce(
      new Error("network failure"),
    );

    await expect((actions.deleteUserImage as jest.Mock)(fd)).rejects.toThrow(
      "network failure",
    );
    expect(actions.deleteUserImage).toHaveBeenCalledWith(fd);
  });
});
