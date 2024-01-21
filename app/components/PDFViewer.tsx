"use client";
import React from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./PDFViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Props {
  pdfUrl: string;
  setNumPages: (page: number) => void;
  pageNumber: number;
}

const PDFViewer = ({ pdfUrl, setNumPages, pageNumber }: Props) => {
  return (
    <Document file={pdfUrl} onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}>
      <Page pageNumber={pageNumber} />
    </Document>
  );
};

export default PDFViewer;
