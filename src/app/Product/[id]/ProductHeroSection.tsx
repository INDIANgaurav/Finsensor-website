import React from "react";
import Image from "next/image";
import HeroImage from "@/../../public/finso360.png";
import { motion } from "framer-motion";
const ProductHeroSection: React.FC = () => {
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
          className="pr-2 space-y-3 text-center lg:text-left"
          data-aos="fade-right"
          data-aos-duration="1000"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated Gradient Text */}
          <motion.h1
            className="font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gray-900 bg-gradient-to-r from-[#283c91] via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
              FinSoEasy360
            </span>
          </motion.h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#010001]">
            Financial Reporting Software
          </p>

          <motion.p
            className="text-base sm:text-lg md:text-xl font-normal text-[#010001]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Elevate your financial management with {" "}
            <span className="font-bold text-[#1e3a8a]">FinSoEasy360</span>. Our advanced, fully automated software simplifies the process of generating and reviewing Balance Sheet, Statement of profit and loss, Statement of cash flows and other financial reports. Users can easily export reports to Excel, allowing for adjustments and modifications to suit their needs. Boost your productivity with powerful reporting tools designed to ensure accuracy and efficiency at every step. 
            
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
              src={HeroImage}
              alt="Awesome hero page image"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductHeroSection;
