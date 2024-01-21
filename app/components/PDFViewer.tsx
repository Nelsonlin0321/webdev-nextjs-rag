"use client";
import React from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./PDFViewer.css";
import Spinner from "./Spinner";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Props {
  pdfUrl: string;
  setNumPages: (page: number) => void;
  pageNumber: number;
}

const PDFViewer = ({ pdfUrl, setNumPages, pageNumber }: Props) => {
  return (
    <Document
      file={pdfUrl}
      onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
      onLoadError={(error) => console.log(error)}
      loading={<Spinner />}
      error={""}
    >
      <Page pageNumber={pageNumber} />
    </Document>
  );
};

export default PDFViewer;
