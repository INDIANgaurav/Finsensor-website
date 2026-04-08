"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";

const LAMHeroSection: React.FC = () => {
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
      <div className="w-full mx-auto grid items-center gap-0 lg:gap-2 lg:grid-cols-2 py-6 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10 relative z-10">
        <motion.div
          className="pr-2 space-y-3 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-[#283c91] via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
              LAMsoEasy360
            </span>
          </motion.h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#010001]">
            Lease Assets Management Software
          </p>

          <motion.p
            className="text-base sm:text-lg md:text-xl font-normal text-[#010001]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Elevate your lease accounting and reporting with{" "}
            <span className="font-bold text-[#1e3a8a]">LAMsoEasy360</span>. Our
            advanced, fully automated lease asset management software simplifies
            the process of capturing, tracking, and accounting for leases in
            full compliance with Ind AS 116. The system streamlines the
            generation and review of Right-of-Use (ROU) assets, lease
            liabilities, interest on lease liability, unwinding of interest on
            security deposits, depreciation and related disclosures, ensuring
            accurate transition and ongoing reporting. Users can easily export
            all lease schedules and financial reports to Excel, allowing for
            adjustments and modifications while maintaining adherence to Ind AS
            116 requirements. Boost your productivity with powerful, rule-based
            reporting tools that reduce errors, enhance transparency, and drive
            efficiency at every step of lease lifecycle management.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative flex justify-center xl:justify-end items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Image
              className="transition-transform mx-auto duration-500 ease-in-out w-full max-w-md sm:max-w-lg lg:max-w-xl rounded"
              src="/lam360.png"
              alt="LAMsoEasy360 hero image"
              width={600}
              height={400}
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LAMHeroSection;
