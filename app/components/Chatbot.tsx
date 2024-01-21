"use client";
import React, { useEffect, useState } from "react";
import SelectDocsAsk from "./SelectDocsAsk";
import ChatHistory from "./ChatHistory";
import { Button } from "semantic-ui-react";

interface Props {
  fileNames: string[];
}

export interface chatRecord {
  question: string;
  file_name: string;
  answer: string;
  uuid: string;
  page_number: number;
}

export const Chatbot = ({ fileNames }: Props) => {
  const initChatRecords = [
    {
      context: "total population in Hong Kong Island",
      question:
        "What is the percentage of total population in Hong Kong Island ? ",
      file_name: "Hong Kong Fact Sheets - Population.pdf",
      answer:
        "Answer: 17.5% of the total population in Hong Kong is in Hong Kong Island. Page Number->1.",
      page_number: 1,
      uuid: "77fa6513-8224-4bbd-a7aa-3ea89ed5d4cd",
    },
  ];

  const [chatRecords, setChatRecords] = useState<chatRecord[]>(initChatRecords);

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
      <Button onClick={() => setChatRecords([])}>Clear History</Button>
    </>
  );
};
