"use client";
import { TextField } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { Button } from "semantic-ui-react";
import toast, { Toaster } from "react-hot-toast";
import apiClient from "../services/api-client";
import { chatRecord } from "./Chatbot";
// import { AxiosError } from "axios";
import Spinner from "./Spinner";

interface Props {
  fileName: string;
  fileNames: string[];
  chatRecords: chatRecord[];
  setChatRecords: (records: chatRecord[]) => void;
}

const QuestionField = ({
  fileName,
  fileNames,
  chatRecords,
  setChatRecords,
}: Props) => {
  const questionRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);
  const submitData = { question: "", file_name: fileName };

  return (
    <div className="w-full">
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (questionRef.current != null) {
            if (questionRef.current.value.split(" ").length < 3) {
              toast.error("The question requires at least 3 words");
              return;
            }

            if (!fileNames.includes(fileName)) {
              toast.error("The selected PDF document doesn't exist!");
              return;
            }
            submitData.question = questionRef.current.value;
            setLoading(true);
            try {
              await apiClient
                .post<chatRecord>("/api/retrieval_generate", submitData)
                .then((res) => {
                  setChatRecords([res.data, ...chatRecords]);
                  setLoading(false);
                });
            } catch (error) {
              // const response = (error as AxiosError).response?.data;
              // const message = (response as { message: string }).message;
              // const errorMessage = message || "Unexpected Error";
              const errorMessage = "Unexpected Error";
              toast.error(errorMessage, { duration: 1000 });
            } finally {
              setLoading(false);
            }
          }
        }}
      >
        <div>
          <span>
            Please write down your question related to selected PDF Document
          </span>
          <TextField.Root className="mb-2">
            <TextField.Input
              placeholder="Example Question: What are steps to take when finding projects to build your AI experience ?"
              ref={questionRef}
            />
          </TextField.Root>
          <Button type="submit" className="cursor-pointer" color="blue">
            Ask
            {isLoading && <Spinner />}
          </Button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default QuestionField;
