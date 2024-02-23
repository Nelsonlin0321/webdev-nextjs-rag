import React from "react";
// import Image from "next/image";
import { Heading, Text } from "@radix-ui/themes";

const Banner = () => {
  return (
    <>
      {/* <Image
        src="/assets/RAG-banner.png"
        width="300"
        height="300"
        alt="Picture of the author"
      /> */}
      <Heading
        size="7"
        // className="bg-gradient-to-r via-gray-600 to-blue-800 bg-clip-text text-transparent"
      >
        Empower Your Organizations Document Intelligence with RAG
      </Heading>
      <Text className="font-semibold">
        Upload your PDF and Talk to them with AI!
      </Text>
    </>
  );
};

export default Banner;
