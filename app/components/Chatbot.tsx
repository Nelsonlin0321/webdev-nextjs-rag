"use client";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const savedChatRecords = localStorage.getItem("chatRecords");
    if (savedChatRecords) {
      const parsedChatRecords = JSON.parse(savedChatRecords);
      if (parsedChatRecords.length > 0) {
        setChatRecords(parsedChatRecords);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatRecords", JSON.stringify(chatRecords));
  }, [chatRecords]);

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
