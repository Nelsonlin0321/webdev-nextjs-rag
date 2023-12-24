"use client";
import { Flex, TextField } from "@radix-ui/themes";
import React from "react";
import { Button } from "semantic-ui-react";
import Spinner from "./Spinner";

interface Props {
  fileName: string;
}

const QuestionField = ({ fileName }: Props) => {
  return (
    <div className="w-full">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // console.log(event);
        }}
      >
        <div>
          <span>
            Please write down your question related to selected PDF Document
          </span>
          <TextField.Root className="mb-2">
            <TextField.Input placeholder="Question:" />
          </TextField.Root>
          <Button
            type="submit"
            className="cursor-pointer"
            color="blue"
            onClick={() => console.log(fileName)}
          >
            Ask
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionField;
