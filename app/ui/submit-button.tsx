"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";
import { StringOrUndefined } from "../lib/definitions";

export function SubmitButton({
  children,
  className,
  disabled,
  ...rest
}: {
  children: string;
  className: StringOrUndefined;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  const isDisabled = disabled || pending;

  return (
    <button
      className={clsx(
        className,
        "w-full",
        isDisabled && "opacity-50 cursor-not-allowed",
      )}
      type="submit"
      disabled={isDisabled}
      {...rest}
    >
      {pending ? "Saving" : children}
    </button>
  );
}
