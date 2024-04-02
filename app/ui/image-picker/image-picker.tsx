"use client";

import React, { useState } from "react";
import { createUserImage } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";

const ImagePicker = ({ user }: { user: User }) => {
  const [file, setFile] = useState(null);
  // const [fileUrl, setFileUrl] = useState(user.thumbnail);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
        formData.append("user-id", user.id);
      }

      await createUserImage(formData);

      // console.log(response);

      // setFileUrl(response.secure_url);
      // console.log(fileUrl);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col p-2">
      <h1 className="font-bold">Image Picker</h1>
      <form className="py-2" onSubmit={handleSubmit}>
        <label htmlFor="file"></label>
        <input
          className="w-[300px]"
          required
          name="file"
          type="file"
          onChange={handleFileChange}
        />
        <div className="flex flex-row py-2">
          {loading ? (
            <button className="bg-amber-200 p-2 rounded" type="submit">
              Uploading...
            </button>
          ) : (
            <button
              className="bg-amber-400 hover:bg-amber-200 p-2 rounded"
              type="submit"
            >
              Upload Image
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ImagePicker;
