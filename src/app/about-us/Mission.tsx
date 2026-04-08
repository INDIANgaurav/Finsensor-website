"use client";

import React from "react";
import { motion } from "framer-motion";
import MissionImage from "../../../public/Mission.svg";
import Image from "next/image";

const Mission = () => {
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
      <div className="w-full mx-auto py-16 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
          <motion.div
            className="relative flex justify-center items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative tech frame */}
              <motion.div
                className="absolute -top-6 md:-left-6  w-full h-full border-2 border-purple-400 rounded-2xl rotate-3"
                animate={{
                  rotate: [3, 5, 3],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-6 right-0 w-10 h-10 bg-yellow-200/40 rounded-full blur-sm animate-bounce"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <Image
                src={MissionImage}
                alt="FinSensor Technology"
                className="rounded-2xl relative z-10 w-full ml-3 max-w-md mx-auto transition-transform duration-500 hover:scale-105 object-cover"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full"
            data-aos="fade-left"
            data-aos-duration="3000"
            initial={{ opacity: 0, x: 50 }}
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
                Our Mission
              </span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl mt-3 font-normal text-[#010001]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our mission at Finsensor is to revolutionize the fintech industry
              by seamlessly integrating financial expertise with groundbreaking
              technology. We are dedicated to providing avant-garde solutions
              that not only meet but exceed the evolving needs of our clients.
              Through continuous innovation, we aim to simplify financial
              complexities, drive efficiency, and contribute to the overall
              advancement of the financial sector. Our commitment to excellence
              and client satisfaction fuels our journey towards becoming the
              trusted partner for transformative financial solutions.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
