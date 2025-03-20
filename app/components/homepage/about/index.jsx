// @flow strict
"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";


function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative z-50">
      <Image
          src="/section.svg"
          alt="Hero"
          width={1572}
          height={795}
          className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
            <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
              About Me
            </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center order-1 lg:order-1">
          <Image
            src={personalData.profile}
            width={420}
            height={280}
            alt="Natnael Bekele"
            className="rounded-lg transition-all duration-1000 cursor-pointer"
          />
        </div>
        <div className="order-2 lg:order-2 p-6 lg:p-0 justify-between">
          {personalData.description.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-200 text-sm lg:text-lg pb-5"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;