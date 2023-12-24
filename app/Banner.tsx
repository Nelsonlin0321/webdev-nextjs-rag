import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/assets/RAG-banner.jpg"
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
  );
};

export default Banner;
