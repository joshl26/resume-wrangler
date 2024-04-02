"use client";

import React from "react";
import { deleteUserImage } from "@/app/lib/actions";

const ImageDeleter = () => {
  return (
    <div>
      <h1>Image Deleter</h1>
      <form action={deleteUserImage}>
        <label htmlFor="publicId"></label>
        <input className="text-black w-1/4" name="publicId" type="text" />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default ImageDeleter;
