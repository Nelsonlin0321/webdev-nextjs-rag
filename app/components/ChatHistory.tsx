"use client";
import { useEffect, useState } from "react";
import { Accordion, Icon, Label } from "semantic-ui-react";
import { chatRecord } from "./Chatbot";
import { Text } from "@radix-ui/themes";

interface Props {
  chatRecords: chatRecord[];
}

const ChatHistory = ({ chatRecords }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [chatRecords]);

  return (
    <Accordion fluid styled>
      {chatRecords.map((message, index) => (
        <div key={index}>
          <Accordion.Title
            active={activeIndex === index}
            onClick={() => {
              if (activeIndex == index) {
                setActiveIndex(-1);
              } else {
                setActiveIndex(index);
              }
            }}
          >
            <Icon name="dropdown" />
            {message.question}
            <div>
              <Label color="orange" ribbon="right">
                <p style={{ maxWidth: 256 }} className="truncate">
                  {message.file_name}
                </p>
              </Label>
            </div>
          </Accordion.Title>

          <Accordion.Content active={activeIndex === index}>
            <Text className="text-gray-800 mb-4 whitespace-pre-line">
              {message.answer}
            </Text>
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default ChatHistory;
