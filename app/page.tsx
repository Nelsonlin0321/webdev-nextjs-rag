import { Flex } from "@radix-ui/themes";
import Banner from "./Banner";
import FileSearcher from "./FileSearcher";
import FileUploader from "./FileUploader";
import prisma from "@/prisma/client";
import Chat from "./Chat";

export default async function Home() {
  const documents = await prisma.document.findMany();
  const docList = documents.map(({ id, fileName }) => ({
    label: fileName,
  }));

  return (
    <Flex className="justify-center items-center" direction="column" gap={"4"}>
      <Banner />
      <FileUploader />
      <FileSearcher docList={docList} />
      <Chat />
    </Flex>
  );
}
