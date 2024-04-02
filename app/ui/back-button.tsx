import Link from "next/link";
import React from "react";

const BackButton = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link className="px-3 hover:underline hover:text-rose-500" href={href}>
      {children}
    </Link>
  );
};

export default BackButton;
