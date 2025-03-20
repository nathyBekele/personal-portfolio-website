// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ContactForm />
        <div className="lg:w-3/4">
          {/* Desktop View */}
          <div className="hidden lg:flex flex-col gap-9">
            <p className="text-xl flex items-center gap-3 hover:translate-x-2 transition-all duration-300">
              <MdAlternateEmail
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <span className="hover:text-[#16f2b3]">{personalData.email}</span>
            </p>
            <p className="text-xl flex items-center gap-3 hover:translate-x-2 transition-all duration-300">
              <IoMdCall
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <span className="hover:text-[#16f2b3]">{personalData.phone}</span>
            </p>
            <p className="text-xl flex items-center gap-3 hover:translate-x-2 transition-all duration-300">
              <CiLocationOn
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <span className="hover:text-[#16f2b3]">{personalData.address}</span>
            </p>
            <Link target="_blank" href={personalData.github} className="text-xl flex items-center gap-3 hover:translate-x-2 transition-all duration-300">
              <IoLogoGithub
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={37}
              />
              <span className="hover:text-[#16f2b3]">nathyBekele</span>
            </Link>
            <Link target="_blank" href={personalData.linkedIn} className="text-xl flex items-center gap-3 hover:translate-x-2 transition-all duration-300">
              <BiLogoLinkedin
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={37}
              />
              <span className="hover:text-[#16f2b3]">Natnael Bekele</span>
            </Link>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden flex flex-col items-center">
            <div className="grid grid-cols-3 gap-6 mb-8">
              <Link href={`mailto:${personalData.email}`} className="flex flex-col items-center gap-2">
                <MdAlternateEmail
                  className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800"
                  size={48}
                />
                <span className="text-sm">Email</span>
              </Link>
              <Link href={`tel:${personalData.phone}`} className="flex flex-col items-center gap-2">
                <IoMdCall
                  className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800"
                  size={48}
                />
                <span className="text-sm">Call</span>
              </Link>
              <div className="flex flex-col items-center gap-2">
                <CiLocationOn
                  className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800"
                  size={48}
                />
                <span className="text-sm">Location</span>
              </div>
            </div>
            <div className="flex gap-6">
              <Link target="_blank" href={personalData.github}>
                <IoLogoGithub
                  className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800"
                  size={48}
                />
              </Link>
              <Link target="_blank" href={personalData.linkedIn}>
                <BiLogoLinkedin
                  className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800"
                  size={48}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;