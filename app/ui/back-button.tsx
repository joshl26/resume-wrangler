import clsx from "clsx";
import Link from "next/link";
import React from "react";

const BackButton = ({
  href,
  children,
  classname,
}: {
  href: string;
  children: string;
  classname: string;
}) => {
  return (
    <Link className={clsx("hover:underline", classname)} href={href}>
      {children}
    </Link>
  );
};

export default BackButton;
