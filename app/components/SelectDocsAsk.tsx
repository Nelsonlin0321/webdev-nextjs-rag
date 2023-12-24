"use client";
import React, { useState } from "react";
import FileSearcher from "./FileSearcher";
import QuestionField from "./QuestionField";

interface Props {
  fileNames: string[];
}

const SelectDocsAsk = ({ fileNames }: Props) => {
  const [fileName, setFileName] = useState("");

  return (
    <>
      <FileSearcher fileNames={fileNames} setFileName={setFileName} />
      <QuestionField fileName={fileName} />
    </>
  );
};

export default SelectDocsAsk;
