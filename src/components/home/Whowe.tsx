import React from "react";
import overStory from "../../../public/Whowe.svg";
import Image from "next/image";
import { Sparkles, Cpu } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const Whowe = () => {
  return (
    <section className="relative overflow-hidden bg-white/30 backdrop-blur-md py-1">
      {/* Gradient background blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-purple-300 to-blue-300 rounded-full blur-[120px] opacity-30 z-0"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tr from-yellow-100 to-purple-200 rounded-full blur-[100px] opacity-20 z-0"></div>
    
      {/* Decorative floating shapes */}
      <div className="absolute bottom-40 right-52 w-32 h-32 border-2 border-yellow-200 rotate-45 opacity-30 animate-pulse z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-200/20 rounded-lg -translate-x-1/2 -translate-y-1/2 rotate-12 animate-spin-slow z-0"></div>
    
      {/* Main content container */}
      <div className="w-full mx-auto relative z-10 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-0 lg:gap-2">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-left"
          >
            <h3 className="group text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-5 relative inline-block bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
              Who We Are
            </h3>

            <p className="text-[#010001] text-md leading-relaxed mt-2">
              At FinSensor, we are a team of dedicated chartered accountants,
              engineers and technicians committed to revolutionizing the finance
              and reporting landscape. By leveraging cutting-edge automated
              solutions, we empower businesses to streamline their financial
              processes, enhance accuracy, and boost productivity.
            </p>
            <p className="mt-3 sm:mt-4 text-[#010001] text-md leading-relaxed">
              Our expertise ensures that clients can focus on strategic
              decision-making while we handle the complexities of financial
              reporting. With a blend of professionalism and innovation, we
              strive to deliver exceptional value and drive success for our
              clients in an ever-evolving financial environment.
            </p>

            {/* Icon Highlights */}
            <ul className="mt-5 sm:mt-6 space-y-3 sm:space-y-4 text-[#010001] text-lg sm:text-xl">
              <li className="flex items-start gap-3">
                <Sparkles className="text-purple-600 w-6 h-6 sm:w-7 sm:h-7 mt-1 flex-shrink-0" />
                <span>Automation-driven financial insights</span>
              </li>
              <li className="flex items-start gap-3">
                <Cpu className="text-purple-600 w-6 h-6 sm:w-7 sm:h-7 mt-1 flex-shrink-0" />
                <span>Engineered by experts from finance & tech</span>
              </li>
            </ul>

            {/* CTA Button */}
            <Link
              href="/about-us"
              className="mt-5 mb-8 sm:mt-6 inline-block text-white cursor-pointer bg-gradient-to-br from-purple-600 to-[#283c91]
                hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                focus:ring-blue-300 dark:focus:ring-blue-900 font-medium 
                rounded-lg text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-3.5 text-center  
                shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            >
              Learn More About Us
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative flex justify-center xl:justify-end  items-center order-last md:order-none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={imageVariants}
          >
            <div className="relative">
              {/* Decorative tech frame */}
              <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-full h-full border-2 border-purple-400 rounded-2xl rotate-3"></div>
              <div className="absolute top-4 sm:top-6 right-0 w-8 sm:w-10 h-8 sm:h-10 bg-yellow-200/40 rounded-full blur-sm animate-bounce"></div>

              <Image
                src={overStory}
                alt="FinSensor Technology"
                className="rounded-2xl relative z-10 w-full max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-3xl transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Whowe;
