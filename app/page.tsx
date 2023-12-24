import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import Banner from "./components/Banner";
import Chat from "./components/Chat";
import FileUploader from "./components/FileUploader";
import SelectDocsAsk from "./components/SelectDocsAsk";

export default async function Home() {
  const documents = await prisma.document.findMany();
  const fileNames = documents.map(({ id, fileName }) => fileName);

  return (
    <Flex className="justify-center items-center" direction="column" gap={"4"}>
      <Banner />
      <FileUploader />
      <SelectDocsAsk fileNames={fileNames} />
      <Chat />
    </Flex>
  );
}
