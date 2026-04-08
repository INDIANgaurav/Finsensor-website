"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Homepagemainimg from "../../../public/hero-about.png";

const HeroSection = () => {
  return (
    <section
      className="relative  overflow-hidden"
      style={{
        background: `
      radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
      linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))
    `,
      }}
    >
      <div className="w-full mx-auto grid items-center gap-0 lg:gap-2 lg:grid-cols-2 py-6 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10 relative z-10">
        {/* Text Section */}
        <motion.div
          className="space-y-4 text-left"
          data-aos="fade-right"
          data-aos-duration="1000"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated Gradient Text */}
          <motion.h1
            className=""
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-gray-900 bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
              About FinSensor:
            </span>
            <br />
            <span className="text-xl sm:text-2xl font-bold leading-tight tracking-tight text-gray-900 lg:text-3xl xl:text-4xl">
              {" "}
              Streamlining Financial Reporting with SaaS Solutions
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl font-normal text-[#010001]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            At FinSensor, we pride ourselves on being at the forefront of
            innovation in financial reporting. Our mission is simple yet
            ambitious: to empower businesses with cutting-edge Software as a
            Service (SaaS) solutions that streamline the preparation of
            financial statements.
          </motion.p>
        </motion.div>
        <motion.div
          className="relative flex justify-center xl:justify-end items-center"
          data-aos="fade-left"
          data-aos-duration="1000"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              id="heroImg1"
              className="transition-transform mx-auto duration-500 ease-in-out w-full max-w-md sm:max-w-lg lg:max-w-xl rounded"
              src={Homepagemainimg}
              alt="Awesome hero page image"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
