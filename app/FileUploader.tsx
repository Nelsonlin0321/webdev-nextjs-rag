"use client";
import { Button } from "@radix-ui/themes";
import React, { useState } from "react";
import apiClient from "./services/api-client";
import { AxiosError } from "axios";
import Spinner from "./components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const FileUploader = () => {
  const [file, setFile] = useState<File>();
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setSubmitting(true);
    try {
      const data = new FormData();
      data.set("file", file);
      await apiClient.post("/api/ingest", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.refresh();
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
    <div className="w-full">
      <form onSubmit={onSubmit}>
        <input
          className="mb-2 block w-full cursor-pointer rounded-lg border dark:border-gray-600 dark:bg-gray-100 dark:text-gray-400"
          type="file"
          name="file"
          onChange={(e) => {
            if (e.target.files !== null) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <Button size={"2"} type="submit" className="cursor-pointe">
          {isSubmitting ? "Processing File" : "Upload and Process File"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default FileUploader;
