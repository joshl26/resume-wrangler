"use client";

import React, { useState } from "react";
import { createUserImage } from "@/app/lib/actions";
import Image from "next/image";

const ImagePicker = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
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
      }

      const response: any = await createUserImage(formData);

      // console.log(response);

      setFileUrl(response.secure_url);
      // console.log(fileUrl);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Image Picker</h1>
      <h2>{fileUrl}</h2>
      {fileUrl === null ? (
        ""
      ) : (
        <Image src={fileUrl} width={250} height={250} alt="" />
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="file"></label>
        <input required name="file" type="file" onChange={handleFileChange} />
        {loading ? (
          <button type="submit">Uploading...</button>
        ) : (
          <button type="submit">Upload Image</button>
        )}
      </form>
    </div>
  );
};

export default ImagePicker;
