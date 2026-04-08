"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Carousel from "@/customComponets/Carousel/Carousel";
import ManulEntruy from "@/../../public/ManulEntry.png";

const InAction = () => {
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
        <div className="text-center mb-12">
          <motion.h2
            className="group text-2xl md:text-4xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
              See FinSoEasy360 in Action
            </span>
          </motion.h2>

          <motion.p
            className="text-md mt-3 font-normal text-[#010001] max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore our intuitive interface and powerful features through these
            screenshots
          </motion.p>
        </div>

        {/* 1. Dashboard and Reports */}
        <div
          style={{
            background: `
      radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
      linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))
    `,
          }}
          className="flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-12 p-5 mb-16 rounded-xl"
        >
          <div className="sm:w-1/2 w-full flex justify-center">
            <Carousel slidename="Dashboard&Report" />
          </div>
          <div className="sm:w-1/2 w-full">
            <motion.h2
              className="group text-xl md:text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
                Dashboard and Reports
              </span>
            </motion.h2>

            <ul className="list-disc text-md mt-3 font-normal text-[#010001] max-w-lg mx-auto lg:mx-0 space-y-2 px-2">
              <li>
                The dashboards allow users to perform variance analysis with
                ease, helping identify discrepancies or trends in financial data
                through intuitive visuals and interactive charts.
              </li>
              <li>
                The tool ensures that financial statements are generated in
                accordance with Schedule III requirements, providing accurate
                and compliant reports along with detailed notes to account in
                Excel format with fully navigation through excel formulas.
              </li>
              <li>
                The same-time analysis feature provides instant updates and
                analysis, enabling users to make informed financial decisions
                based on the latest available data, enhancing decision-making
                efficiency.
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Chat With Units */}
        <div
          style={{
            background: `
      radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
      linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))
    `,
          }}
          className="flex flex-col-reverse sm:flex-row items-center justify-between gap-8 md:gap-12 p-5 mb-16 rounded-lg"
        >
          <div className="sm:w-1/2 w-full">
            <motion.h2
              className="group text-xl md:text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
                Chat With Units & Sync
              </span>
            </motion.h2>

            <ul className="list-disc text-md mt-3 font-normal text-[#010001] max-w-lg mx-auto lg:mx-0 space-y-2 px-2">
              <li>
                The chat feature enables real-time communication with various
                company units, ensuring that important updates or clarifications
                can be quickly addressed, streamlining the financial reporting
                process.
              </li>
              <li>
                The sync functionality allows the reviewers to track the
                changes from the previous reviewed versions of financial
                statements even to the extent of notes to accounts information.
              </li>
              <li>
                With consolidated data and communication, the tool reduces
                delays and discrepancies, facilitating faster and more precise
                preparation of financial reports across the organization.
              </li>
            </ul>
          </div>
          <div className="sm:w-1/2 w-full flex justify-center">
            <Carousel slidename="Unti&Sync" />
          </div>
        </div>

        {/* 3. Manual Entry */}
        <div
          style={{
            background: `
      radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
      linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))
    `,
          }}
          className="flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-12 p-5 mb-16 py-10 rounded-xl"
        >
          <div className="sm:w-1/2 w-full flex justify-center">
            <div className="relative p-1 border-[1px] border-gray-500 rounded-md ">
              <Image
                src={ManulEntruy}
                alt="Manual Entry"
                className="object-contain rounded-md w-full h-auto"
              />
            </div>
          </div>
          <div className="sm:w-1/2 w-full">
            <motion.h2
              className="group text-xl md:text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
                Manual Entry Enabler
              </span>
            </motion.h2>

            <ul className="list-disc text-md mt-3 font-normal text-[#010001] max-w-lg mx-auto lg:mx-0 space-y-2 px-2">
              <li>
                FinSoEasy360 allows for manual entry posting and sophisticated
                categorization of these entries. Further, rapid post feature of
                manual entries also controls as a checklist what has been posted
                and what is pending for period end reporting entries. By this,
                the software provides a robust mechanism for tracking and
                control over the top side manual entries in the financial
                statements.
              </li>
              <li>
                This not only makes the audit process more efficient but also
                helps in maintaining transparency and accountability in
                financial reporting.
              </li>
              <li>
                Management can oversee the manual entries posted in different
                units and subsidiaries from a single platform, improving control
                and oversight.
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Notes Info */}
        <div
          style={{
            background: `
      radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
      linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))
    `,
          }}
          className="flex flex-col-reverse sm:flex-row items-center justify-between gap-8 md:gap-12 p-5 mb-10 rounded-lg"
        >
          <div className="sm:w-1/2 w-full">
            <motion.h2
              className="group text-xl md:text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
                Notes and Footnotes Info Management
              </span>
            </motion.h2>

            <ul className="list-disc text-md mt-3 font-normal text-[#010001] max-w-lg mx-auto lg:mx-0 space-y-2 px-2">
              <li>
                FinSoEasy360 allows users to flow notes to accounts information into Financial Statements through the software interface. 
              </li>
              <li>
              Multiple users can add or edit notes to accounts information simultaneously for respective units/subsidiaries, joint ventures, associates enabling efficient collaboration among team members during the financial reporting process. 
              </li>
              <li>
                Notes to accounts information of multiple units/subsidiaries can be consolidated on a real-time basis, helping users integrate the data with no additional effort. 
              </li>
            </ul>
          </div>
          <div className="sm:w-1/2 w-full flex justify-center">
            <Carousel slidename="Notes" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InAction;
