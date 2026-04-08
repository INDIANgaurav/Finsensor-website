import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section
      className="py-10 sm:py-14 px-5 sm:px-8 md:px-12 lg:px-16 relative overflow-hidden"
      style={{
        background: `
        radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
        linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))
      `,
      }}
    >
      <motion.div
        className="w-full mx-auto border-2 border-[#caa6f8] py-5 px-5 sm:px-8 md:px-10 bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-2xl sm:rounded-3xl transition-all duration-300"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.01 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2,
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* Left Content */}
          <motion.div
            className="max-w-xl text-left md:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.4,
            }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.6,
              }}
            >
              <span className="bg-gradient-to-r from-[#283c91] via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
                Where Finance Meets Innovation
              </span>
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl font-normal mb-4 sm:mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.8,
              }}
            >
              At FinSensor, we&apos;re reimagining the financial world with
              smart, tech-driven solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 1.0,
              }}
            >
              <Link
                href="/contact-us"
                className="inline-block bg-gradient-to-br from-purple-600 to-[#283c91] 
      hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
      focus:ring-blue-300 dark:focus:ring-blue-900 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-lg sm:text-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Connect with Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.6,
            }}
          >
            <Image
              src="/Vendor Reconcilation.png"
              alt="CRM Headshot"
              width={280}
              height={280}
              className="rounded-xl w-56 sm:w-64 md:w-72 lg:w-80"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
