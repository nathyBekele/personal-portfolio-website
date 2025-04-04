"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "", 
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `/api/contact`,
        userInput
      );

      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-violet-600 rounded-lg blur opacity-25"></div>
      <div className="relative bg-[#0d1224] rounded-lg p-6 lg:p-8">
        <h2 className="font-medium mb-6 text-[#16f2b3] text-2xl lg:text-3xl uppercase tracking-wider">Get In Touch</h2>
        
        <div className="text-white">
          <p className="text-sm lg:text-base text-[#d3d8e8] mb-8">{"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}</p>
          
          <form className="flex flex-col gap-6" onSubmit={handleSendMail}>
            <div className="flex flex-col gap-2">
              <label className="text-sm lg:text-base font-medium text-gray-200">Your Name</label>
              <input
                className="bg-[#10172d] w-full border rounded-lg border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-gray-100"
                type="text"
                maxLength="100"
                required={true}
                onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
                onBlur={checkRequired}
                value={userInput.name}
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm lg:text-base font-medium text-gray-200">Your Email</label>
              <input
                className="bg-[#10172d] w-full border rounded-lg border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-gray-100"
                type="email"
                maxLength="100"
                required={true}
                value={userInput.email}
                placeholder="john@example.com"
                onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                onBlur={() => {
                  checkRequired();
                  setError({ ...error, email: !isValidEmail(userInput.email) });
                }}
              />
              {error.email && <p className="text-sm text-red-400 mt-1">Please provide a valid email!</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm lg:text-base font-medium text-gray-200">Your Message</label>
              <textarea
                className="bg-[#10172d] w-full border rounded-lg border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-gray-100 min-h-[120px]"
                maxLength="500"
                name="message"
                required={true}
                placeholder="Your message here..."
                onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
                onBlur={checkRequired}
                rows="4"
                value={userInput.message}
              />
            </div>

            <div className="flex flex-col items-center gap-3 mt-2">
              {error.required && 
                <p className="text-sm text-red-400">All fields are required!</p>
              }
              <button
                className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                type="submit"
                disabled={isLoading}
              >
                <span className="relative block rounded-full bg-[#0d1224] px-8 py-3 hover:bg-transparent transition duration-200">
                  <div className="flex items-center justify-center gap-2 text-white">
                    {isLoading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <TbMailForward className="group-hover:translate-x-1 transition-transform" size={20} />
                      </>
                    )}
                  </div>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;