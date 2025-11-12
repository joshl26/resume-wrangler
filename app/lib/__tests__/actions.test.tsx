/**
 * __tests__/actions.test.ts
 *
 * Tests for server actions in app/lib/actions.ts
 */

/// <reference types="jest" />

import { jest } from "@jest/globals";

// Mock all external dependencies
jest.mock("cloudinary-build-url", () => ({
  extractPublicId: jest.fn(),
}));

jest.mock("@/app/lib/database", () => ({
  conn: {
    query: jest.fn(),
  },
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("axios", () => ({
  post: jest.fn(),
}));

jest.mock("crypto", () => ({
  createHash: jest.fn(() => ({
    update: jest.fn(),
    digest: jest.fn(),
  })),
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

const cloudinary = require("cloudinary").v2;
jest.mock("cloudinary", () => ({
  v2: {
    uploader: {
      upload_stream: jest.fn((options: any, callback: any) => {
        return {
          end: jest.fn(),
        };
      }),
    },
  },
}));

// Mock the regex exports
jest.mock("@/app/lib/regex", () => ({
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^.*$/,
  usernameRegex: /^[a-zA-Z0-9_]+$/,
}));

// Import the module under test after mocks
import * as actions from "@/app/lib/actions";
import { extractPublicId } from "cloudinary-build-url";
import { conn } from "@/app/lib/database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import axios from "axios";
import bcrypt from "bcrypt";
import { auth } from "@/auth";

// Define types for our mocks
type HashFn = (password: string, saltOrRounds: number) => Promise<string>;
type FetchFn = typeof fetch;
type AuthFn = (req?: any) => Promise<{ user: { id: string } } | null>;
type AxiosPostFn = (
  url: string,
  data?: any,
  config?: any,
) => Promise<{ data: any }>;
type QueryFn = (sql: string, params?: any[]) => Promise<any>;

// Define a type for our mock file
interface MockFile {
  name: string;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
}

// Define a type for our mock FormData
interface MockFormData {
  get: (key: string) => string | MockFile | null;
}

describe("actions.ts", () => {
  let hashMock: jest.MockedFunction<HashFn>;
  let fetchMock: jest.MockedFunction<FetchFn>;
  let authMock: jest.MockedFunction<AuthFn>;
  let axiosPostMock: jest.MockedFunction<AxiosPostFn>;
  let connQueryMock: jest.MockedFunction<QueryFn>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup typed bcrypt hash mock
    hashMock = jest.fn() as unknown as jest.MockedFunction<HashFn>;
    (bcrypt as unknown as { hash: jest.MockedFunction<HashFn> }).hash =
      hashMock;

    // Setup typed fetch mock
    fetchMock = jest.fn() as unknown as jest.MockedFunction<FetchFn>;
    (global as any).fetch = fetchMock;

    // Setup typed auth mock
    authMock = auth as unknown as jest.MockedFunction<AuthFn>;

    // Setup typed axios.post mock
    axiosPostMock = jest.fn() as unknown as jest.MockedFunction<AxiosPostFn>;
    (axios as unknown as { post: jest.MockedFunction<AxiosPostFn> }).post =
      axiosPostMock;

    // Setup typed conn.query mock (fixes '{} is not assignable to never' issues)
    connQueryMock = jest.fn() as unknown as jest.MockedFunction<QueryFn>;
    (conn as unknown as { query: jest.MockedFunction<QueryFn> }).query =
      connQueryMock;
  });

  describe("authenticate", () => {
    it("should return undefined on successful authentication", async () => {
      fetchMock.mockResolvedValue({ status: 302, ok: false } as any);

      const formData = new FormData();
      formData.append("email", "test@example.com");
      formData.append("password", "password123");

      const result = await actions.authenticate(undefined, formData);

      expect(result).toBeUndefined();
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/callback/credentials"),
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }),
      );
    });

    it('should return "CredentialSignin" on authentication failure', async () => {
      fetchMock.mockResolvedValue({ status: 401, ok: false } as any);

      const formData = new FormData();
      formData.append("email", "test@example.com");
      formData.append("password", "wrongpassword");

      const result = await actions.authenticate(undefined, formData);

      expect(result).toBe("CredentialSignin");
    });

    it('should return "UnknownError" on network error', async () => {
      fetchMock.mockRejectedValue(new Error("Network error"));

      const formData = new FormData();
      formData.append("email", "test@example.com");
      formData.append("password", "password123");

      const result = await actions.authenticate(undefined, formData);

      expect(result).toBe("UnknownError");
    });
  });

  describe("CreateNewUser", () => {
    it("should return validation errors for invalid input", async () => {
      const formData = new FormData();
      formData.append("username", "ab"); // too short
      formData.append("email", "invalid-email");
      formData.append("password", "123"); // too short

      const result = await actions.CreateNewUser(formData);

      expect(result).toHaveProperty("errors");
      expect(result).toHaveProperty("message");
    });

    it("should create a new user with valid input", async () => {
      const formData = new FormData();
      formData.append("username", "testuser");
      formData.append("email", "test@example.com");
      formData.append("password", "password123");

      hashMock.mockResolvedValue("hashedPassword");
      connQueryMock.mockResolvedValue({});

      const result = await actions.CreateNewUser(formData);

      expect(hashMock).toHaveBeenCalledWith("password123", 10);
      expect(connQueryMock).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO users"),
      );
      expect(redirect).toHaveBeenCalledWith("/login");
    });

    it("should redirect to register on database error", async () => {
      const formData = new FormData();
      formData.append("username", "testuser");
      formData.append("email", "test@example.com");
      formData.append("password", "password123");

      hashMock.mockResolvedValue("hashedPassword");
      connQueryMock.mockRejectedValue(new Error("Database error"));

      await actions.CreateNewUser(formData);

      expect(redirect).toHaveBeenCalledWith("/register");
    });
  });

  describe("deleteAccount", () => {
    it("should return error when not authenticated", async () => {
      authMock.mockResolvedValue(null);

      const formData = new FormData();
      formData.append("id", "user123");

      const result = await actions.deleteAccount(formData);

      expect(result).toEqual({ success: false, error: "Not authenticated" });
    });

    it("should return error when unauthorized", async () => {
      authMock.mockResolvedValue({ user: { id: "user123" } } as any);

      const formData = new FormData();
      formData.append("id", "differentUser");

      const result = await actions.deleteAccount(formData);

      expect(result).toEqual({ success: false, error: "Unauthorized" });
    });

    it("should successfully delete account with all related data", async () => {
      authMock.mockResolvedValue({ user: { id: "user123" } } as any);

      const formData = new FormData();
      formData.append("id", "user123");

      // Make conn.query return success for all DELETE calls,
      // while still returning {} for transaction control commands.
      connQueryMock.mockImplementation(async (sql: string, params?: any) => {
        const trimmed = (sql || "").toString().trim().toUpperCase();
        if (
          trimmed === "BEGIN" ||
          trimmed === "COMMIT" ||
          trimmed === "ROLLBACK"
        ) {
          return {};
        }
        // For deletes / inserts / updates return an object with rowCount = 1
        return { rowCount: 1 };
      });

      const result = await actions.deleteAccount(formData);

      expect(result).toEqual({ success: true });
      expect(connQueryMock).toHaveBeenCalledWith("BEGIN");
      expect(connQueryMock).toHaveBeenCalledWith("COMMIT");
      expect(connQueryMock).toHaveBeenCalledWith(
        "DELETE FROM users WHERE id = $1",
        ["user123"],
      );
    });

    it("should rollback transaction on error", async () => {
      authMock.mockResolvedValue({ user: { id: "user123" } } as any);

      const formData = new FormData();
      formData.append("id", "user123");

      connQueryMock
        .mockResolvedValueOnce({}) // BEGIN
        .mockRejectedValueOnce(new Error("Database error")); // First delete fails

      const result = await actions.deleteAccount(formData);

      expect(result).toEqual({
        success: false,
        error: "Failed to delete account",
      });
      expect(connQueryMock).toHaveBeenCalledWith("ROLLBACK");
    });
  });

  describe("createUserImage", () => {
    it("should upload image and update user record (mock FormData.get)", async () => {
      // Create a file-like object with arrayBuffer()
      const fakeFile: MockFile = {
        name: "test.jpg",
        type: "image/jpeg",
        // Use Buffer so it works in Node/Jest environments
        arrayBuffer: async () => Buffer.from("test-file-bytes").buffer,
      };

      const fakeFormData: MockFormData = {
        get: (k: string) => {
          if (k === "user-id") return "user123";
          if (k === "file") return fakeFile;
          return null;
        },
      };

      const mockUploader = { end: jest.fn() };
      cloudinary.uploader.upload_stream.mockImplementation(
        (options: any, callback: any) => {
          callback(null, { secure_url: "https://example.com/image.jpg" });
          return mockUploader;
        },
      );

      connQueryMock.mockResolvedValue({});

      await actions.createUserImage(fakeFormData as unknown as FormData);

      expect(cloudinary.uploader.upload_stream).toHaveBeenCalled();
      expect(connQueryMock).toHaveBeenCalledWith(
        "UPDATE users SET thumbnail = 'https://example.com/image.jpg' WHERE id = 'user123'",
      );
      expect(redirect).toHaveBeenCalledWith("/dashboard/user-profile/");
    });

    it("should return error message on image upload failure (mock FormData.get)", async () => {
      const fakeFile: MockFile = {
        name: "test.jpg",
        type: "image/jpeg",
        arrayBuffer: async () => Buffer.from("test-file-bytes").buffer,
      };

      const fakeFormData: MockFormData = {
        get: (k: string) => {
          if (k === "user-id") return "user123";
          if (k === "file") return fakeFile;
          return null;
        },
      };

      const mockUploader = { end: jest.fn() };
      cloudinary.uploader.upload_stream.mockImplementation(
        (options: any, callback: any) => {
          callback(new Error("Upload failed"), null);
          return mockUploader;
        },
      );

      const result = await actions.createUserImage(
        fakeFormData as unknown as FormData,
      );

      expect(result).toEqual({ message: "Image not uploaded" });
    });
  });

  describe("deleteUserImage", () => {
    it("should delete image from Cloudinary and update user record", async () => {
      const formData = new FormData();
      formData.append("user-id", "user123");
      formData.append("image-url", "https://example.com/image.jpg");

      (extractPublicId as jest.Mock).mockReturnValue("image_public_id");

      // Mock Cloudinary delete response
      axiosPostMock.mockResolvedValue({
        data: { result: "ok" },
      });

      connQueryMock.mockResolvedValue({});

      await actions.deleteUserImage(formData);

      expect(axiosPostMock).toHaveBeenCalled();
      expect(connQueryMock).toHaveBeenCalledWith(
        "UPDATE users SET thumbnail = '' WHERE id = 'user123' AND thumbnail = 'https://example.com/image.jpg'",
      );
      expect(redirect).toHaveBeenCalledWith("/dashboard/user-profile/");
    });

    it("should handle Cloudinary delete error", async () => {
      const formData = new FormData();
      formData.append("user-id", "user123");
      formData.append("image-url", "https://example.com/image.jpg");

      (extractPublicId as jest.Mock).mockReturnValue("image_public_id");

      // Mock Cloudinary delete failure
      axiosPostMock.mockRejectedValue(new Error("Delete failed"));

      const result = await actions.deleteUserImage(formData);

      expect(result).toEqual({ message: "Image not deleted" });
    });
  });

  describe("updateUser", () => {
    it("should return validation errors for invalid input", async () => {
      const formData = new FormData();
      // Missing required fields

      const result = await actions.updateUser("user123", {}, formData);

      expect(result).toHaveProperty("errors");
      expect(result).toHaveProperty("message");
    });

    it("should update user with valid input", async () => {
      const formData = new FormData();
      formData.append("name", "John Doe");
      formData.append("email", "john@example.com");
      formData.append("first_name", "John");
      formData.append("last_name", "Doe");
      formData.append("address_one", "123 Main St");
      formData.append("address_two", "Apt 4B");
      formData.append("address_three", "City, State");
      formData.append("phone", "555-1234");
      formData.append("website", "https://johndoe.com");
      formData.append("resume_id", "resume123");

      connQueryMock.mockResolvedValue({});

      await actions.updateUser("user123", {}, formData);

      expect(connQueryMock).toHaveBeenCalled();
      expect(revalidatePath).toHaveBeenCalledWith(
        "/dashboard/resume/edit/resume123",
      );
      expect(redirect).toHaveBeenCalledWith("/dashboard/resume/edit/resume123");
    });
  });

  describe("createResumeLine", () => {
    it("should return validation errors for invalid input", async () => {
      const formData = new FormData();
      // Missing required fields

      const result = await actions.createResumeLine(formData);

      expect(result).toHaveProperty("errors");
      expect(result).toHaveProperty("message");
    });

    it("should create a new resume line", async () => {
      const formData = new FormData();
      formData.append("user_id", "user123");
      formData.append("resume_id", "resume123");
      formData.append("line_type", "education");
      formData.append("id", "education123");

      // Mock query to check if line already exists
      connQueryMock
        .mockResolvedValueOnce({ rowCount: 0 }) // Check if exists
        .mockResolvedValueOnce({}); // Insert new line

      await actions.createResumeLine(formData);

      expect(connQueryMock).toHaveBeenCalledTimes(2);
      expect(revalidatePath).toHaveBeenCalledWith(
        "/dashboard/resume/edit/resume123",
      );
      expect(redirect).toHaveBeenCalledWith("/dashboard/resume/edit/resume123");
    });

    it("should return error if resume line already exists", async () => {
      const formData = new FormData();
      formData.append("user_id", "user123");
      formData.append("resume_id", "resume123");
      formData.append("line_type", "education");
      formData.append("id", "education123");

      // Mock query to find existing line
      connQueryMock.mockResolvedValueOnce({ rowCount: 1 });

      const result = await actions.createResumeLine(formData);

      expect(result).toEqual({
        message:
          "Database Error: Resume already has education education123 included.",
      });
    });
  });

  describe("deleteResumeLine", () => {
    it("should return validation errors for invalid input", async () => {
      const formData = new FormData();
      // Missing required fields

      const result = await actions.deleteResumeLine(formData);

      expect(result).toHaveProperty("errors");
      expect(result).toHaveProperty("message");
    });

    it("should delete a resume line", async () => {
      const formData = new FormData();
      formData.append("user_id", "user123");
      formData.append("id", "education123");
      formData.append("resume_id", "resume123");
      formData.append("line_type", "education");

      connQueryMock.mockResolvedValue({});

      await actions.deleteResumeLine(formData);

      expect(connQueryMock).toHaveBeenCalledWith(
        "DELETE FROM resume_lines WHERE resume_id = 'resume123' AND user_education_id = 'education123'",
      );
      expect(revalidatePath).toHaveBeenCalledWith(
        "/dashboard/resume/edit/resume123",
      );
      expect(redirect).toHaveBeenCalledWith("/dashboard/resume/edit/resume123");
    });
  });
});
