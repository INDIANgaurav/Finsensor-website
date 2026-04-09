"use client";

import Image from "next/image";
import Amit from "@/../public/Amit2.jpg";
import Saurabh from "@/../public/Saurabh.jpeg";
import Prashant from "@/../public/PrashantJha.jpg";
import Gaurav from "@/../public/Gaurav.jpg";
import Abhinav from "@/../public/Abhinav.jpg";
import { motion } from "framer-motion";
import Link from "next/link";
const Leaders = [
  {
    name: "Amit Garg",
    title: "Chief Executive Office",
    tag: "CEO",
    image: Amit,
    description: `Amit Garg is a Chartered Accountant with over 20 years of experience in Ind AS/IFRS implementations, statutory audit, internal audit, process reviews, and due diligence. He is a seasoned and mature professional. He has previously worked in EY for more than 12 years in its audit and assurance division. He handled large multi-disciplinary projects, internal control reviews, capital market transactions and complex group level audits. 

He brings deep domain expertise to the design and implementation of financial reporting software that meets complex accounting and regulatory requirements, including Ind AS and IFRS standards. 

He understands the real-world needs of preparers, auditors, and CFOs, and is widely appreciated by clients and professionals for his pragmatic, business-oriented advice.  

Complementing his practice experience, Amit is also a faculty member   for IFRS/Ind AS courses conducted by ICAI, Delhi University and corporates. 

Leveraging this unique blend of technical knowledge, audit practice insight, and training experience, he has conceptualised and developed a suite of software tools for financial statement consolidation, lease accounting and reporting automation. As CEO, he leads the vision and product strategy of the company, ensuring that the software is user-friendly, technically robust, and aligned with evolving accounting standards and audit expectations. 

 `,
  },
  {
    name: "Saurabh Aggarwal",
    tag: "Director",
    title: "Chief Product Officer ",
    image: Saurabh,
    description: `Saurabh Aggarwal is a Chartered Accountant with over 16 years of experience in Ind AS/IFRS implementations, statutory audit, internal audit, process reviews, and due diligence. He is a seasoned and mature professional. He has also served at S.R. Batliboi & Co. LLP (member firm of EY) and BSR & Co. LLP (member firm of KPMG) for more than 11 years, where he handled a diversified clientele across sectors including automotive, FMCG, cement, and other large industry segments.  

He has extensive experience in IFRS, Ind AS, Indian GAAP, special audits, IFRS transition, ICFR, SOX testing, business process re-engineering, tax audits, capital market transactions, and due diligence. 

He combines deep accounting practice knowledge with a strong product vision mindset to shape software that meets the needs of auditors, CFOs, and regulatory reporting teams. 

Leveraging this hands-on experience, Saurabh is now involved with FinSensor in the development of a comprehensive suite of software for financial statement consolidation, lease accounting and related reporting automation.  `,
  },
  {
    name: "Prashant Jha",
    tag: "Director",
    title: "Chief Operations Officer ",
    image: Prashant,
    description: `Prashant is a Chartered Accountant with over 12 years of experience in taxation, assurance, and regulatory advisory. He is renowned for his technical prowess in financial reporting, consolidations and taxation. 

Prashant previously worked for more than three years at S. R. Batliboi & Co. LLP (an EY member firm), serving diverse clients including listed corporates, leading real estate developers, and players in steel, fertilizer, aviation, healthcare, and services. A seasoned professional with deep insight into the Indian market, he earns client praise for practical guidance on business and compliance challenges. With exceptional project management skills, he has led large-scale implementations involving cross-functional teams, delivering against tight deadlines for high-stakes consolidations. 

Prashant ensures in leveraging our financial statements consolidation software from the consolidated financials and process optimizations perspective.  `,
  },
  {
    name: "Gaurav Malik",
    tag: "Technology Lead",
    title: "Financial Planning & Analysis",
    image: Gaurav,
    description: `Gaurav Malik is a Chartered Accountants by profession and carries over 10 years of experience in Financial Planning & Analysis (FP&A) and data analytics at leading organizations including EY, Vedanta Limited, Kotak Mahindra Bank Limited, and other global MNCs. He brings proven expertise to FinSensor's financial statements consolidation platform. 

He has spearheaded budgeting and forecasting for complex, multi-entity groups; conducted margin and profitability analysis across consolidated structures; and built advanced financial models. Key contributions include internal management reporting automation and external deliverables like investor presentations, press releases, and annual reports. 

At FinSensor, Gaurav empowers clients to transform fragmented financial data into actionable insights, driving efficiency in group-wide reporting and strategic decision-making. `,
  },
  {
    name: "Abhinav Aggarwal",
    tag: "Technology Lead",
    title: "Business Transformation",
    image: Abhinav,
    description: `Abhinav Aggarwal is a Chartered Accountant by profession with more than 10 years of experience in Financial Planning & Analysis (FP&A), business transformation, and automation implementation at organizations like Infosys Limited, Sumitomo, and other global MNCs, Abhinav excels in driving consolidation efficiency at FinSensor. 

They have led finance transformation projects, ERP and FP&A tool implementations, process improvements, and business analytics initiatives—focusing on streamlining multi-entity consolidations, intercompany reconciliations, and real-time group reporting. Proficient in scalable analytics, delivering measurable ROI through automation and data-driven insights. 

At FinSensor, Abhinav helps clients accelerate their finance digital journey, transforming complex consolidations into agile, compliant operations. `,
  },
];
export default function OurLeaders() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at center, rgb(255 255 243 / 35%) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
          linear-gradient(to right, #F9F8FC, rgba(220, 197, 255, 0.21))
        `,
      }}
    >
      <div className="w-full mx-auto py-16 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10">
        <h2 className="font-bold text-center mb-12 sm:mb-16 text-gray-900">
          <span className="text-2xl lg:text-4xl font-bold tracking-tight text-gray-900 xl:text-4xl bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
            Our Leadership
          </span>
        </h2>

        <div className="space-y-20 md:space-y-12">
          {Leaders.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`flex p-2 sm:p-4 lg:p-10 rounded-2xl flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-10 md:gap-16 lg:gap-24`}
              style={{
                background: `
                  radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
                  linear-gradient(
                    ${index % 2 === 0 ? "to right" : "to left"},
                    #F9F8FC,
                    rgba(220, 197, 255, 0.21)
                  )
                `,
              }}
            >
              {/* Image Box */}
              <div className="w-full md:w-5/12 lg:w-4/12 flex justify-center">
                <div className="relative w-full max-w-xs sm:max-w-sm rounded-lg overflow-hidden shadow-lg border-2 border-[#283c91] transform transition-transform duration-300 ease-in-out hover:scale-[0.98]">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className=" object-cover object-top  "
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 w-full bg-[#283c91]/90 text-white px-4 py-3 text-center">
                    <p className="font-semibold text-base sm:text-md">
                      {member.name}
                    </p>
                    <p className="text-xs sm:text-sm opacity-90">
                      {member.title || member.tag}
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full md:w-7/12 lg:w-8/12 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-[#283c91] rounded-full"></span>
                  <p className="text-base font-semibold text-[#283c91]">
                    {member.tag}
                  </p>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {member.name}
                </h3>
                {member.title && member.title !== member.tag && (
                  <p className="text-sm text-gray-600 font-medium">
                    {member.title}
                  </p>
                )}
                <div className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
                  {member.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mb-20 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10">
        <motion.div
          className="w-full mx-auto p-8 text-center relative rounded-2xl border-2 border-[#caa6f8] bg-white/10 backdrop-blur-md overflow-hidden shadow-md flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Background image layer */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/cat-bg.avif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.3, // Adjust to your desired background fade
            }}
          ></div>

          {/* Decorative Highlight */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-24 h-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-full blur-sm opacity-70 animate-pulse z-10"></div>

          {/* Foreground content */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#283c91]">
              Ready to Elevate Your Business?
            </h2>
            <p className="text-[#283c91] font-medium max-w-xl mx-auto text-base sm:text-lg mb-8">
              Connect with our leadership to explore tailored solutions or book
              a personalized demo.
            </p>

            <Link
              href="/contact-us"
              className="inline-block bg-gradient-to-br from-purple-600 to-[#283c91] hover:from-[#283c91] hover:to-purple-700 text-white px-6 py-2 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 relative z-10"
            >
              Contact Us / Request Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
