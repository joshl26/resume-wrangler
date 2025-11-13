/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImagePicker from "../image-picker";
import * as actions from "@/app/lib/actions";
import type { User } from "@/app/lib/definitions";

// Mock the createUserImage action
jest.mock("@/app/lib/actions", () => ({
  createUserImage: jest.fn(),
}));

describe("ImagePicker", () => {
  const u = userEvent.setup();

  const mockUser: User = {
    id: "user123",
    name: "Test User",
    email: "test@example.com",
  } as unknown as User;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form with file input and upload button", () => {
    render(<ImagePicker user={mockUser} />);

    expect(screen.getByText(/Image Picker/i)).toBeInTheDocument();

    const fileInput = screen.getByTitle("file") as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute("type", "file");

    const uploadButton = screen.getByRole("button", { name: /upload image/i });
    expect(uploadButton).toBeInTheDocument();
  });

  it("selecting a file (user.upload) and submitting calls createUserImage with FormData (with debug)", async () => {
    render(<ImagePicker user={mockUser} />);

    const fileInput = screen.getByTitle("file") as HTMLInputElement;
    const uploadButton = screen.getByRole("button", { name: /upload image/i });

    // Create a fake file
    const file = new File(["dummy content"], "avatar.jpg", {
      type: "image/jpeg",
    });

    // Use user.upload with an array to reliably populate input.files in JSDOM
    await u.upload(fileInput, [file]);

    // Ensure the input now has files (jsdom will reflect length)
    expect(fileInput.files?.length).toBe(1);
    expect(fileInput.files?.[0]!.name).toBe("avatar.jpg");

    // Make the mock resolve
    (actions.createUserImage as jest.Mock).mockResolvedValueOnce({});

    // Submit the form directly to bypass browser validation issues
    const form = uploadButton.closest("form") as HTMLFormElement | null;
    if (!form) throw new Error("form not found");
    fireEvent.submit(form);

    // Debug: small delay then log DOM and mock.calls
    await new Promise((r) => setTimeout(r, 20));

    // Wait for the mocked action to be called
    await waitFor(() => {
      expect(actions.createUserImage).toHaveBeenCalledTimes(1);
    });

    // Inspect FormData passed to the mock
    const calledWith = (actions.createUserImage as jest.Mock).mock.calls[0][0];
    // Debug: log that we received something and its type

    expect(calledWith).toBeInstanceOf(FormData);
    const formData = calledWith as FormData;
    const fileEntry = formData.get("file") as File | null;
    expect(fileEntry).toBeInstanceOf(File);
    expect((fileEntry as File).name).toBe("avatar.jpg");
    expect(formData.get("user-id")).toBe("user123");
  });

  it("shows 'Uploading...' button while loading (with debug)", async () => {
    render(<ImagePicker user={mockUser} />);

    const fileInput = screen.getByTitle("file") as HTMLInputElement;
    const uploadButton = screen.getByRole("button", { name: /upload image/i });

    const file = new File(["dummy"], "test.png", { type: "image/png" });
    await u.upload(fileInput, [file]);

    // Debug: confirm file uploaded

    // Mock the action to delay resolution so we can observe the loading state
    (actions.createUserImage as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 200)),
    );

    // Submit the form directly
    const form = uploadButton.closest("form") as HTMLFormElement | null;
    if (!form) throw new Error("form not found");
    fireEvent.submit(form);

    // Wait for the uploading button text to appear
    const uploadingBtn = await screen.findByRole("button", {
      name: /uploading/i,
    });
    expect(uploadingBtn).toBeInTheDocument();

    // Wait for the mock to resolve and the UI to return to original button text
    await waitFor(
      () =>
        expect(
          screen.getByRole("button", { name: /upload image/i }),
        ).toBeInTheDocument(),
      { timeout: 1500 },
    );
  });

  it("logs error to console if createUserImage throws (with debug)", async () => {
    render(<ImagePicker user={mockUser} />);

    const fileInput = screen.getByTitle("file") as HTMLInputElement;
    const uploadButton = screen.getByRole("button", { name: /upload image/i });

    const file = new File(["dummy"], "fail.png", { type: "image/png" });
    await u.upload(fileInput, [file]);

    const error = new Error("Upload failed");
    (actions.createUserImage as jest.Mock).mockRejectedValueOnce(error);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Submit the form directly
    const form = uploadButton.closest("form") as HTMLFormElement | null;
    if (!form) throw new Error("form not found");
    fireEvent.submit(form);

    await new Promise((r) => setTimeout(r, 20));

    // Wait for the component's catch block to run and console.error to be called
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    expect(consoleSpy).toHaveBeenCalledWith(expect.anything());

    consoleSpy.mockRestore();
  });
});
