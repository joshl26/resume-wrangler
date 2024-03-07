"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  className,
  buttonText,
}: {
  className: string;
  buttonText: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button className={className} type="submit" aria-disabled={pending}>
      {buttonText != "" ? buttonText : "Submit"}
    </button>
  );
}
