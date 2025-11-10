import { StringOrUndefined } from "@/app/lib/definitions";
import clsx from "clsx";
import React from "react";

const AzureBlob = ({ className }: { className: StringOrUndefined }) => {
  return (
    <div
      className={clsx(
        className,
        "absolute rounded-full bg-gradient-radial-azure blur-[131px] opacity-[0.6]",
      )}
    />
  );
};

export default AzureBlob;
