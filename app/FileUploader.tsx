"use client";
import { Button } from "@radix-ui/themes";
import React, { useState } from "react";
import apiClient from "./services/api-client";
import { AxiosError } from "axios";
import Spinner from "./components/Spinner";
import delay from "delay";
import toast, { Toaster } from "react-hot-toast";

const FileUploader = () => {
  const [file, setFile] = useState<File>();
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    if (!file) return;
    try {
      await delay(500);
      const data = new FormData();
      data.set("file", file);
      await apiClient.post("/api/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully!", { duration: 1000 });
    } catch (error) {
      const response = (error as AxiosError).response?.data;
      const message = (response as { message: string }).message;
      const errorMessage = message || "File Uploading Failed!";
      toast.error(errorMessage, { duration: 1000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className="mb-2 block w-full cursor-pointer rounded-lg border focus:outline-none dark:border-gray-600 dark:bg-gray-100 dark:text-gray-400"
          type="file"
          name="file"
          onChange={(e) => {
            if (e.target.files !== null) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <Button size={"2"} type="submit" className="cursor-pointe">
          Upload File
          {isSubmitting && <Spinner />}
        </Button>
      </form>
      <Toaster />
    </>
  );
};

export default FileUploader;
