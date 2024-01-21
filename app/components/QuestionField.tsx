"use client";
import { TextField, Text, Heading } from "@radix-ui/themes";
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
  const contextRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);
  const submitData: {
    question: string;
    file_name: string;
    context?: null | string;
  } = { question: "", file_name: fileName };

  return (
    <div className="w-full">
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (questionRef.current) {
            if (questionRef.current.value.split(" ").length < 3) {
              toast.error("The question requires at least 3 words");
              return;
            }

            if (!fileNames.includes(fileName)) {
              toast.error("The selected PDF document doesn't exist!");
              return;
            }
            submitData.question = questionRef.current.value;
            if (contextRef.current) {
              submitData.context = contextRef.current.value;
            }

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
          <Heading size={"2"}>
            Question's context for better searching the relevant content
            [Optional]
          </Heading>
          <TextField.Root className="mb-2">
            <TextField.Input
              placeholder="Context: Asset allocation with a duration"
              ref={contextRef}
            />
          </TextField.Root>
          <Heading size={"2"}>
            Your question related to selected PDF Document
          </Heading>
          <TextField.Root className="mb-2">
            <TextField.Input
              placeholder="Question: Given the criteria, if the percentage of the portfolio with a duration longer than 7 years is less than 20%, answer me Yes or No, does this document satisfy this criteria?"
              ref={questionRef}
            />
          </TextField.Root>

          <Button
            type="submit"
            className="cursor-pointer"
            color="blue"
            disabled={isLoading}
          >
            {isLoading ? "Thinking..." : "Ask"}
            {isLoading && <Spinner />}
          </Button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default QuestionField;
