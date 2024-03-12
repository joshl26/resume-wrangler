"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: any }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit">{pending === false ? children : "Saving"}</button>
  );
}
