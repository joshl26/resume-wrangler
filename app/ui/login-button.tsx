"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";
import { StringOrUndefined } from "../lib/definitions";

export function LoginButton({
  children,
  className,
}: {
  children: string;
  className: StringOrUndefined;
}) {
  const { pending } = useFormStatus();

  return (
    <button className={clsx(className, "w-full")} type="submit">
      {pending === false ? children : "Signing In"}
    </button>
  );
}
