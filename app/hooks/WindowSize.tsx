"use client";

import React from "react";

import { useWindowSize } from "./useWindowSize";

const WindowSize = ({ children }: { children: React.ReactNode }) => {
  const size = useWindowSize();

  // console.log(size.height);

  //Limit to devices with screen sizes larger than 768px width and 300px height
  if (size.height > 300 && size.width > 768) {
    return <div>{children}</div>;
  } else if (size.height === 0 && size.width === 0) {
    <></>;
  } else {
    return <div>PLEASE LOGIN USING A DEVICE WITH A LARGER SCREEN SIZE!</div>;
  }
};

export default WindowSize;
