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
        "Example: What are steps to take when finding projects to build your AI experience ?",
      file_name: "eBook-How-to-Build-a-Career-in-AI.pdf",
      answer:
        "To find projects and build your AI experience, you can follow these steps:\n\n1. Identify a business problem: Start by finding a domain expert and ask them about the top three things they wish worked better. Focus on identifying a real-world problem rather than just an AI problem.\n\n2. Brainstorm AI solutions: Once you understand the problem, brainstorm potential AI solutions. Consider different approaches and technologies that can be applied to solve the problem effectively.\n\n3. Join existing projects: If someone else has an idea or ongoing project, ask to join them. Collaborating with others can provide valuable learning opportunities and help you gain practical experience.\n\n4. Keep reading and talking to people: Continuously educate yourself by reading books, taking courses, and engaging with domain experts. This can spark new ideas and expand your knowledge in AI.\n\n5. Focus on an application area: Instead of solely focusing on advancing basic AI technology, explore the vast variety of applications where machine learning has not yet been applied. Look for unique and creative opportunities to apply AI in specific domains.\n\nBy following these steps, you can find meaningful projects, gain experience, and build your portfolio in the field of AI.",
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
