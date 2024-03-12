"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  className,
}: {
  children: any;
  className: any;
}) {
  const { pending } = useFormStatus();

  return (
    <button className={clsx(className, "w-full")} type="submit">
      {pending === false ? children : "Saving"}
    </button>
  );
}
