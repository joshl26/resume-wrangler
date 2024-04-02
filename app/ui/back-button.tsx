import Link from "next/link";
import React from "react";

const BackButton = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link
      className="hover:underline hover:text-azure-radiance-500 font-light m-auto"
      href={href}
    >
      {children}
    </Link>
  );
};

export default BackButton;
