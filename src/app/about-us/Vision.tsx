import React from "react";
import { motion } from "framer-motion";
import Vision_image from "../../../public/Vision.png";
import Image from "next/image";

const Vision = () => {
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
      <div className="w-full mx-auto py-10 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
          <motion.div
            className="w-full"
            data-aos="fade-right"
            data-aos-duration="3000"
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
                Our Vision
              </span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl mt-3 font-normal text-[#010001]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              At Finsensor&apos; our vision is to be the catalyst for a
              progressive and inclusive financial ecosystem. We aspire to
              leverage our deep financial expertise and cutting-edge
              technological solutions to empower individuals and
              businesses&apos; fostering financial growth and resilience in an
              ever-evolving global landscape.
            </motion.p>
          </motion.div>
          <motion.div
            className="mt-8 md:mt-0 flex justify-center xl:justify-end"
            data-aos="fade-left"
            data-aos-duration="3000"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={Vision_image}
                alt="About Us Image"
                className="object-cover rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md transition-transform duration-500"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
