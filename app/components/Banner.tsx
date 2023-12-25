import React from "react";
import Image from "next/image";
import { Text } from "@radix-ui/themes";
import { Flex } from "@radix-ui/themes";

const Banner = () => {
  return (
    <>
      <Image
        src="/assets/RAG-banner.png"
        width="800"
        height="800"
        alt="Picture of the author"
      />
      <Text className="italic">
        Upload your documents and Talk to them with RAG!
      </Text>
    </>
  );
};

export default Banner;
