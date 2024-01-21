import React from "react";
import Image from "next/image";
import { Heading, Text } from "@radix-ui/themes";

const Banner = () => {
  return (
    <>
      <Image
        src="/assets/RAG-banner.png"
        width="300"
        height="300"
        alt="Picture of the author"
      />
      <Heading className="italic">
        Empower your organization's Document Intelligence with RAG
      </Heading>
      <Text>Upload your documents and Talk to them with RAG!</Text>
    </>
  );
};

export default Banner;
