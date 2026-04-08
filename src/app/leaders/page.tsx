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
    title: "Audit & IPO Advisor",
    tag: "CEO",
    image: Amit,
    description: `Amit is a part of assurance team. He has over 18 years of experience 
      of consulting and audit in varied industrial sectors. He is a mature 
      professional who understands the local market and is appreciated by 
      his clients for his advice in business matters.          
      He has also worked with E&Y for more than 12 years in statutory audit 
      practice.          
      He is a fellow member of the Institute of Chartered Accountants of 
      India "ICAI". He specializes in Ind AS/IFRS implementations, statutory 
      audit, internal audit, process reviews, due diligence. He has very good 
      project management skills having led large projects which involved  
      multi-disciplinary teams and worked against tight deadlines.          
      Amit also has rich experience in handling capital market transactions.          
      In addition to above, Amit is also faculty for IFRS/Ind AS course 
      conducted by Institute of Chartered Accountants of India, Delhi 
      University and large consulting firms.`,
  },
  {
    name: "Saurabh Aggarwal",
    tag: "Director",
    title: "Audit & Compliance Specialist",
    image: Saurabh,
    description: `Saurabh is a part of assurance team. He has over 10 years of 
      professional experience in Assurance and Advisory Services. He 
      has extensive experience in IFRS, Ind AS, IGAAP, special audits, 
      IFRS transition, ICFR, SOX Testing, Business Process re-
      engineering, tax audits, Capital Market transactions, and due 
      diligence.            
      Saurabh has worked with S.R.Batliboi & Co. LLP (member firm of 
      EY) and BSR & Co. LLP (member firm of KPMG) over a decade.          
      During his stint at EY and KPMG, he has served a diversified 
      clientele spanning across sectors. He was handling public 
      companies and large multinational corporations during his tenure.          
      Saurabh has worked in Automotive, FMCG, Cement and other 
      sectors.
      Saurabh has also handled capital market transaction of JK 
      Cements Limited.`,
  },
  {
    name: "Prashant Jha",
    tag: "Director",
    title: "Tax & Regulatory Advisor",
    image: Prashant,
    description: `Prashant Jha is a Chartered accountant and leads Tax and Regulatory 
      advisory. Prashant has 10+ years of professional experience in taxation, 
      Assurance and Regulatory advisory and is known for his technical 
      expertise. He has worked with S. R Batliboi & Co. LLP (EY) and served 
      clients in real estate, aviation, healthcare, etc. He specializes in 
      financial statement review from tax perspective, GST audit, litigations, 
      direct taxes, etc.`,
  },
  {
    name: "Gaurav Malik",
    tag: "Technology Lead",
    title: "Financial Planning & Analysis",
    image: Gaurav,
    description: `8+ years of experience in Financial Planning and Analysis, Data Analytics with organizations like EY, Vedanta Limited, Kotak Mahindra Bank Limited & other global MNCs. Handled Budgeting, Margin/Profitability Analysis, Financial modelling, Credit Rating, Due Diligence, Internal Management Reporting, External reporting like investor presentation, press release and Annual reports.`,
  },
  {
    name: "Abhinav Aggarwal",
    tag: "Technology Lead",
    title: "Business Transformation",
    image: Abhinav,
    description: `8+ years of experience in Financial Planning and Analysis, Business transformation & Tool Implementation with organizations like Infosys Limited, Sumitomo & other global MNCs. Handled Finance Transformation Projects, ERP & FP&A Tool Implementations, Process Improvement & Business Analytics projects.`,
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
