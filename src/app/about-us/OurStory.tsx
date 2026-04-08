"use client";

import React from "react";
import { motion } from "framer-motion";
import overStory from "../../../public/our-story.png";
import Image from "next/image";

const Overstory = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `
        radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
        linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))
      `,
      }}
    >
      {/* Decorative floating blobs */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-40 animate-pulse"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-52 h-52 bg-pink-100 rounded-full blur-3xl opacity-30 animate-ping"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="w-full mx-auto py-16 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Right: Image */}
          <motion.div
            className="mt-8 md:mt-0 flex justify-center xl:justify-start"
            data-aos="fade-left"
            data-aos-duration="3000"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative group transition-all duration-500 rounded-xl p-1 bg-white/10 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-2xl hover:border-purple-400 animate-border"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={overStory}
                alt="About Us"
                className="object-cover rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md transition-transform duration-500 group-hover:scale-99"
              />
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-400 transition-all duration-500 animate-borderPulse" />
            </motion.div>
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="group text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
                Our Story{" "}
              </span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl mt-3 font-normal text-[#010001]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Founded by a team of Ex-Big Four Firms veterans with a shared
              vision for revolutionizing financial reporting, FinSensor emerged
              from a recognition of the challenges businesses face in managing
              their financial data efficiently and accurately.
              <br />
              <br />
              Our journey began with a commitment to developing robust,
              user-friendly SaaS solutions that simplify complex processes and
              drive tangible results for our clients.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes borderPulse {
          0% {
            border-color: transparent;
          }
          50% {
            border-color: rgba(168, 85, 247, 0.4);
          }
          100% {
            border-color: transparent;
          }
        }
        .animate-borderPulse {
          animation: borderPulse 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Overstory;
