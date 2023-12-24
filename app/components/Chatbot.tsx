"use client";
import React, { useState } from "react";
import SelectDocsAsk from "./SelectDocsAsk";
import ChatHistory from "./ChatHistory";

interface Props {
  fileNames: string[];
}

export interface chatRecord {
  question: string;
  file_name: string;
  answer: string;
  uuid: string;
}

export const Chatbot = ({ fileNames }: Props) => {
  const [chatRecords, setChatRecords] = useState<chatRecord[]>([]);
  return (
    <>
      <SelectDocsAsk
        fileNames={fileNames}
        setChatRecords={setChatRecords}
        chatRecords={chatRecords}
      />
      <ChatHistory chatRecords={chatRecords} />
    </>
  );
};
