// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import GlowCard from "../../helper/glow-card";

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />
      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center py-2 pb-20 md:pb-10 lg:pt-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-wave">👋</span>
              <h4 className="text-[25px] lg:text-2xl font-normal text-white">
                Hello! I am <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent font-bold">{personalData.name}</span>
              </h4>
            </div>
            
            <div className="px-3 lg:px-0 text-xl font-light text-gray-300 leading-relaxed">
              <div className="flex items-center gap-2">
                <span>I am a</span>
                <span className="text-[#16f2b3] font-medium animate-pulse">{personalData.designation}</span>
              </div>
              <span>with 4+ years of professional experience.</span>
            </div>

            <p className="px-3 lg:px-0 text-xl font-light text-gray-300 leading-relaxed mt-4 max-w-2xl">
              Welcome to my digital playground, where <span className="text-pink-500">bugs go to cry</span> and <span className="text-violet-500">features come to thrive!</span>
            </p>
          </div>

          <div className="my-12 flex items-center gap-6">
            <Link
              href={personalData.github}
              target='_blank'
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-[#0d1224] rounded-full p-2 transition-all duration-200 hover:scale-110">
                <BsGithub size={30} className="text-white" />
              </div>
            </Link>
            <Link
              href={personalData.linkedIn}
              target='_blank'
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-[#0d1224] rounded-full p-2 transition-all duration-200 hover:scale-110">
                <BsLinkedin size={30} className="text-white" />
              </div>
            </Link>
            <Link
              href={personalData.leetcode}
              target='_blank'
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-[#0d1224] rounded-full p-2 transition-all duration-200 hover:scale-110">
                <SiLeetcode size={30} className="text-white" />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#contact" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <button className="relative px-6 py-3 bg-[#0d1224] rounded-full text-white font-medium tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                <span className="text-[13px] lg:text-[17px]">Contact me</span>
                <RiContactsFill size={16} className="group-hover:animate-bounce" />
              </button>
            </Link>

            <Link href={personalData.resume} target="_blank" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <button className="relative px-6 py-3 bg-[#0d1224] rounded-full text-white font-medium tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                <span className="text-[13px] lg:text-[17px]">Get Resume</span>
                <MdDownload size={16} className="group-hover:animate-bounce" />
              </button>
            </Link>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <GlowCard className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37]">
            <div className="flex flex-row">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
              <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
            </div>
            <div className="px-4 lg:px-8 py-5">
              <div className="flex flex-row space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-orange-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-200"></div>
              </div>
            </div>
            <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
              <code className="font-mono text-xs md:text-sm lg:text-base">
                <div className="blink">
                  <span className="mr-2 text-pink-500">const</span>
                  <span className="mr-2 text-white">coder</span>
                  <span className="mr-2 text-pink-500">=</span>
                  <span className="text-gray-400">{'{'}</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                  <span className="text-gray-400">{`'`}</span>
                  <span className="text-amber-300">Natnael Bekele Haile</span>
                  <span className="text-gray-400">{`',`}</span>
                </div>
                <div className="ml-4 lg:ml-8 mr-2">
                  <span className=" text-white">skills:</span>
                  <span className="text-gray-400">{`['`}</span>
                  <span className="text-amber-300">React</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">NextJS</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">Redux</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">Express</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">NestJS</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">MySql</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">MongoDB</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">Docker</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">AWS</span>
                  <span className="text-gray-400">{"'],"}</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-white">hardWorker:</span>
                  <span className="text-orange-400">true</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-white">quickLearner:</span>
                  <span className="text-orange-400">true</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-white">problemSolver:</span>
                  <span className="text-orange-400">true</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-green-400">hireable:</span>
                  <span className="text-orange-400">function</span>
                  <span className="text-gray-400">{'() {'}</span>
                </div>
                <div>
                  <span className="ml-8 lg:ml-16 mr-2 text-orange-400">return</span>
                  <span className="text-gray-400">{`(`}</span>
                </div>
                <div>
                  <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                  <span className="mr-2 text-white">hardWorker</span>
                  <span className="text-amber-300">&amp;&amp;</span>
                </div>
                <div>
                  <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                  <span className="mr-2 text-white">problemSolver</span>
                  <span className="text-amber-300">&amp;&amp;</span>
                </div>
                <div>
                  <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                  <span className="mr-2 text-white">skills.length</span>
                  <span className="mr-2 text-amber-300">&gt;=</span>
                  <span className="text-orange-400">5</span>
                </div>
                <div><span className="ml-8 lg:ml-16 mr-2 text-gray-400">{`);`}</span></div>
                <div><span className="ml-4 lg:ml-8 text-gray-400">{`};`}</span></div>
                <div><span className="text-gray-400">{`};`}</span></div>
              </code>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;