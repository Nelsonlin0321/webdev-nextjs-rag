"use client";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./PDFViewer.css";
import Spinner from "./Spinner";
import {
  DoubleArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Flex, Text, Button } from "@radix-ui/themes";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Props {
  pdfUrl: string;
  pageNumber: number;
}

const PDFViewer = ({ pdfUrl, pageNumber }: Props) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  console.log(pageNumber);
  const [currentPage, changePage] = useState<number>(pageNumber);

  return (
    <>
      <Document
        file={pdfUrl}
        onLoadSuccess={(pdf) => {
          setNumPages(pdf.numPages);
          changePage(pageNumber);
        }}
        onLoadError={(error) => console.log(error)}
        loading={<Spinner />}
        error={<Text className=" mt-2">This PDF is not available</Text>}
      >
        <Page
          pageNumber={currentPage}
          className={"PDFPage"}
          renderTextLayer={false}
        />
      </Document>
      {numPages && (
        <Flex align="center" gap="2" className="z-50">
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
    </>
  );
};

export default PDFViewer;
