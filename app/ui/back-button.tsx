import clsx from "clsx";
import Link from "next/link";
import React from "react";

const BackButton = ({
  href,
  children,
  className,
}: {
  href: string;
  children: string;
  className: string;
}) => {
  return (
    <Link className={clsx("hover:underline", className)} href={href}>
      {children}
    </Link>
  );
};

export default BackButton;
