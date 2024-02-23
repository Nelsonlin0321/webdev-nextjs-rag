import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import Banner from "./components/Banner";
import FileUploader from "./components/FileUploader";
import { Chatbot } from "./components/Chatbot";
import { useEffect } from "react";

export default async function Home() {
  const documents = await prisma.document.findMany();
  const fileNames = documents.map(({ id, fileName }) => fileName);

  useEffect(() => {
    const disableZoom = () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "viewport");
      meta.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      );
      document.head.appendChild(meta);
    };

    disableZoom();
  }, []);

  return (
    <div>
      <Flex
        className="justify-center items-center mb-10"
        direction="column"
        gap={"4"}
      >
        <Banner />
        <FileUploader />
        <Chatbot fileNames={fileNames} />
      </Flex>
    </div>
  );
}

export const dynamic = "force-dynamic";
