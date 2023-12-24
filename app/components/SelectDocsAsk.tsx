"use client";
import React, { useState } from "react";
import FileSearcher from "./FileSearcher";
import QuestionField from "./QuestionField";
import { chatRecord } from "./Chatbot";

interface Props {
  fileNames: string[];
  chatRecords: chatRecord[];
  setChatRecords: (records: chatRecord[]) => void;
}

const SelectDocsAsk = ({ fileNames, chatRecords, setChatRecords }: Props) => {
  const [fileName, setFileName] = useState(fileNames[0]);

  return (
    <>
      <FileSearcher fileNames={fileNames} setFileName={setFileName} />
      <QuestionField
        fileName={fileName}
        fileNames={fileNames}
        setChatRecords={setChatRecords}
        chatRecords={chatRecords}
      />
    </>
  );
};

export default SelectDocsAsk;
