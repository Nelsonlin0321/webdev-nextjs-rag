"use client";
import { useEffect, useState } from "react";
import { Accordion, Icon, Label } from "semantic-ui-react";
import { chatRecord } from "./Chatbot";
import { Flex, Text, Button } from "@radix-ui/themes";
import { PDFDocumentProxy } from "pdfjs-dist";
import dynamic from "next/dynamic";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

const PDFViewer = dynamic(() => import("./PDFViewer"), {
  ssr: false,
});

interface Props {
  chatRecords: chatRecord[];
}

const ChatHistory = ({ chatRecords }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, changePage] = useState<number>(1);

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
            <PDFViewer
              pdfUrl={`https://d2gewc5xha837s.cloudfront.net/rag-documents/${message.file_name}`}
              setNumPages={setNumPages}
              pageNumber={currentPage}
            />
            {numPages && (
              <Flex align="center" gap="2">
                <Text size="2">
                  page {currentPage} of {numPages}
                </Text>
                <Button
                  color="gray"
                  variant="soft"
                  disabled={currentPage == 1}
                  onClick={() => changePage(1)}
                >
                  <DoubleArrowLeftIcon />
                </Button>
                <Button
                  color="gray"
                  variant="soft"
                  disabled={currentPage == 1}
                  onClick={() => changePage(currentPage - 1)}
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  color="gray"
                  variant="soft"
                  disabled={currentPage >= numPages}
                  onClick={() => changePage(currentPage + 1)}
                >
                  <ChevronRightIcon />
                </Button>
                <Button
                  color="gray"
                  variant="soft"
                  disabled={currentPage >= numPages}
                  onClick={() => changePage(numPages)}
                >
                  <DoubleArrowRightIcon />
                </Button>
              </Flex>
            )}
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default ChatHistory;
