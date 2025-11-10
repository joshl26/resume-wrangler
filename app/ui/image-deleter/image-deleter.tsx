"use client";

import React, { useState } from "react";
import { deleteUserImage } from "@/app/lib/actions";
import { SubmitButton } from "../submit-button";

type DeleteResultPossible =
  | { errors: unknown }
  | { message?: string }
  | Record<string, unknown>;

function hasErrors(obj: unknown): obj is { errors: unknown } {
  return (
    !!obj &&
    typeof obj === "object" &&
    Object.prototype.hasOwnProperty.call(obj, "errors")
  );
}

const ImageDeleter: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Wrapper so form.action receives (formData: FormData) => void | Promise<void>
  const handleDeleteUserImage = async (formData: FormData): Promise<void> => {
    try {
      setIsSubmitting(true);
      setMessage(null);

      const result = (await deleteUserImage(formData)) as DeleteResultPossible;

      if (hasErrors(result)) {
        const err = result.errors;
        const errorMsg = Array.isArray(err)
          ? err.join(", ")
          : typeof err === "string"
            ? err
            : JSON.stringify(err);
        setMessage({
          type: "error",
          text: `Failed to delete image: ${errorMsg}`,
        });
        console.error("Delete user image failed:", result);
        return;
      }

      const msgFromResult = (result as { message?: string }).message;
      // Ensure we always pass a string to message.text
      const successText: string =
        typeof msgFromResult === "string" && msgFromResult.trim() !== ""
          ? msgFromResult
          : "Image deleted successfully";

      setMessage({ type: "success", text: successText });
      console.info("Image deleted", result);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setMessage({ type: "error", text: `Error deleting image: ${errorMsg}` });
      console.error("Unexpected error deleting image:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Image Deleter</h1>

      <form action={handleDeleteUserImage} className="flex flex-col gap-2">
        <label htmlFor="publicId" className="sr-only">
          Public ID
        </label>
        <input
          className="text-black w-1/4 rounded px-2 py-1"
          name="publicId"
          id="publicId"
          type="text"
          placeholder="publicId"
          disabled={isSubmitting}
        />
        <SubmitButton className="" disabled={isSubmitting}>
          {isSubmitting ? "Deleting…" : "Delete"}
        </SubmitButton>

        {message && (
          <div
            className={`p-2 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default ImageDeleter;
