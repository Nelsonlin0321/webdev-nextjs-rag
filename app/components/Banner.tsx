import React from "react";
import Image from "next/image";
import { Heading, Text } from "@radix-ui/themes";
import { Flex } from "@radix-ui/themes";

const Banner = () => {
  return (
    <>
      <Image
        src="/assets/RAG-banner.jpg"
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <Text className="italic">
        Upload your documents and Talk to them with RAG!
      </Text>
    </>
  );
};

export default Banner;
