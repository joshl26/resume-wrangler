import clsx from "clsx";
import React from "react";

const OrangeBlob = ({ className }: { className: any }) => {
  return (
    <div
      className={clsx(
        className,
        "absolute rounded-full bg-gradient-radial-orange blur-[131px] opacity-[0.6]"
      )}
    />
  );
};

export default OrangeBlob;
