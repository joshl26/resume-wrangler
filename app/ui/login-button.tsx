"use client";

import React from "react";
import clsx from "clsx";
import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export function LoginButton({ children, className, disabled }: Props) {
  // must be rendered as a descendant of the <form> that uses the action
  const { pending } = useFormStatus();

  const isDisabled = Boolean(disabled) || Boolean(pending);

  return (
    <button
      type="submit"
      className={clsx(className, "w-full")}
      disabled={isDisabled}
    >
      {pending ? "Signing in…" : children}
    </button>
  );
}
