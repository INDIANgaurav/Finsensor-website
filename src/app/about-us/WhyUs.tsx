"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCode } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";

const features = [
  {
    title: "Expertise",
    description:
      "With years of experience in the financial reporting field, our team brings a wealth of expertise to every project.",
    icon: <FiCode className="w-6 h-6" />,
    animation: "fade-right",
  },
  {
    title: "Innovation",
    description:
      "We are committed to staying ahead of the curve with continuous innovation and development of our solutions.",
    icon: <FaChartLine className="w-6 h-6" />,
    animation: "fade-down",
  },
  {
    title: "Reliability",
    description:
      "Our solutions are built on robust technology infrastructure and undergo rigorous testing to ensure reliability and performance.",
    icon: <AiOutlineRise className="w-6 h-6" />,
    animation: "fade-left",
  },
  {
    title: "Support",
    description:
      "We provide dedicated support and assistance to our clients, helping them maximize the value of our solutions and achieve their business objectives.",
    icon: <AiOutlineRise className="w-6 h-6" />,
    animation: "fade-left",
  },
];

const WhyUs = () => {
  return (
    <section
      className="px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10 md:py-10"
      style={{
        background: `
          radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
          linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))
        `,
      }}
    >
      <motion.div
        className="w-full p-8 mx-auto relative rounded-2xl border-2 border-[#caa6f8] bg-white/10 backdrop-blur-md overflow-hidden shadow-lg flex flex-col items-center min-h-[330px] cursor-pointer transition-transform duration-300"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="group text-2xl md:text-4xl font-extrabold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Why Choose
          <span className="mx-2 bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
            FinSensor
          </span>
          ?
        </motion.h2>
        <div className="grid mt-3 lg:mt-6 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative border border-white/20 rounded-md p-6 bg-[#042c47] hover:shadow-lg transition"
              data-aos={feature.animation}
              data-aos-duration="1200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{
                scale: 1.01,
                y: -5,
                transition: { duration: 0.1 },
              }}
            >
              {/* Top red line */}
              <motion.div
                className="absolute top-0 left-4 right-4 h-1 bg-[#e97944] rounded-t-md"
                initial={{ width: 0 }}
                whileInView={{ width: "calc(100% - 2rem)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 + 0.3 }}
              />

              <div className="flex items-start gap-4">
                <motion.div
                  className="bg-white rounded-md p-2 text-[#e97944]"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <div>
                  <h3 className="text-lg lg:text-xl text-white font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyUs;
