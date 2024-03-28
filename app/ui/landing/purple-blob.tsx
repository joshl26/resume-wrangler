import clsx from "clsx";
import React from "react";

const PurpleBlob = ({ className }: { className: any }) => {
  return (
    <div
      className={clsx(
        className,
        "absolute rounded-full bg-gradient-radial-purple blur-[131px] opacity-[0.6]"
      )}
    />
  );
};

export default PurpleBlob;
