import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
const AllFaq: any = {
  FaqFinsSoEasy360: [
    {
      question:
        "Q1. Can I use this software for monthly preparation of financial statements?",
      answer:
        "A1. Yes, this software can be used to prepare monthly financial statements.",
    },
    {
      question:
        "Q2. Do I need to upload notes to accounts information in the software or can I fill the information directly?",
      answer:
        "A2. In the software, both options are available: you can directly fill in the notes-related information, or you can upload the information through an Excel file template.",
    },
    {
      question:
        "Q3. Can top-side entries (manual entries) be posted in the software during financial statement preparation?",
      answer:
        "A3. Yes, the software allows posting of top-side entries (manual entries), even if there is no GL code in the trial balance. For example, reclassifying capital creditors from trade payables, MSME vendors from non-MSME vendors, current gratuity vs. non-current gratuity, etc. ",
    },
    {
      question:
        "Q4. Can the software generate both Ind AS and IGAAP financial statements?",
      answer:
        "A4. Yes, it can generate both Ind AS and IGAAP financial statements, depending on the mapping of GL codes during initial implementation.",
    },
    {
      question:
        "Q5. Can we preserve the final version of financial statements signed by auditors and management?",
      answer:
        "A5. Yes, the software allows locking the final version of financial statements, which can then be retrieved anytime from the report section.",
    },
    {
      question:
        "Q6. How can we ensure that previous year/period information is not altered?",
      answer:
        "A6. The admin can lock the period, preventing any edits to the previous year/period data while allowing report generation.",
    },
    {
      question:
        "Q7. How can GL code reclassifications in subsequent periods be handled without changing the signed financial statements?",
      answer:
        "A7. The software allows generating financial statements at both the 'User' and 'Admin' levels. This way, changes in live data can be reflected without altering the final signed version.",
    },
    {
      question:
        "Q8. Can we retrieve previous versions of financial statements?",
      answer:
        "A8. Yes, the last 5 versions of financial statements are available every time in the report section.  ",
    },
    {
      question:
        "Q9. Can admin or reviewer identify the changes made from the previous version or after accounts finalisation?  ",
      answer:
        "A9. Yes, changes made from the previous version even to the extent of notes to accounts can be identified through the sync functionality of the software.  ",
    },
    {
      question:
        "Q10. Can unit-wise financial statements be generated in a columnar format?",
      answer:
        "A10. Yes, this is possible by designing the financial statements during initial implementation or later also. ",
    },
  ],
};
const FaqFinSoEasy = ({ ShowFaqName }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative overflow-hidden  rounded-xl py-12 px-4 sm:px-8 "
      style={{
        background:
          "radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-[#283c91] via-indigo-700 to-purple-500 bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
            Frequently Asked Questions
          </span>
        </motion.h2>

        <div className="divide-y divide-gray-200 rounded-lg overflow-hidden shadow-md">
          {AllFaq[ShowFaqName]?.map((faq: any, index: number) => (
            <div
              key={index}
              className="bg-white/40 hover:bg-white/60 transition duration-200"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full justify-between items-center px-6 py-5 text-left text-lg font-medium  focus:outline-none"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 " />
                ) : (
                  <ChevronDown className="w-5 h-5 " />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-700 text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqFinSoEasy;
