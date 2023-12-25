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
}

export const Chatbot = ({ fileNames }: Props) => {
  const initChatRecords = [
    {
      question:
        "What is the percentage of total population in Hong Kong Island ? ",
      file_name: "Hong Kong Fact Sheets - Population.pdf",
      answer:
        "At mid-2014, the population in Hong Kong Island accounted for 17.5% of the total population in Hong Kong.",
      uuid: "d1118d92-2ac5-4ba1-9735-6617578b01ac",
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
