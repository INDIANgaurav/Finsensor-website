"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

// Image imports
// import AmitGarg from "@/../public/Amit.jpg";
// import AmitGarg2 from "@/../public/Amit2.jpg";
import SaurabhAggarwal from "@/../public/SaurabhAggarwal.jpg";
import PrashantJha from "@/../public/PrashantJha.jpg";
import Gaurav from "@/../public/Gaurav.jpg";
import Abhinav from "@/../public/Abhinav.jpg";
import { X } from "lucide-react";
import Amit from "@/../public/Amit2.jpg";
import Saurabh from "@/../public/Saurabh.jpeg";
const team = [
  {
    name: "Amit Garg",
    designation: "CEO",
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
    socials: {
      twitter: "https://twitter.com/AmitGarg",
      linkedin: "https://www.linkedin.com/in/AmitGarg",
      facebook: "https://www.facebook.com/AmitGarg",
    },
  },
  {
    name: "Saurabh Aggarwal",
    designation: "Director",
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
    socials: {
      twitter: "https://twitter.com/SaurabhAggarwal",
      linkedin: "https://www.linkedin.com/in/SaurabhAggarwal",
      facebook: "https://www.facebook.com/SaurabhAggarwal",
    },
  },
  {
    name: "Prashant Jha",
    designation: "Director",
    image: PrashantJha,
    description: `Prashant Jha is a Chartered accountant and leads Tax and Regulatory 
          advisory.
          
          Prashant has 10+ years of professional experience in taxation, 
          Assurance and Regulatory advisory and is known for his technical 
          expertise.
          
          Prashant has worked with S. R Batliboi & Co. LLP (member firm of EY) 
          for more than three years and served diversified clients including listed 
          corporates, India's leading real estate developers, Steel, Fertilizer, 
          Aviation, healthcare and service sector etc.
          
          He is a mature professional who understands the local market and is 
          appreciated by his clients for his advice in business matters.
          
          He specializes in reviews of financial statements from tax perspective, GST audit, 
          tax litigations, process reviews from tax perspective, direct taxes, etc. 
          He has very good project management skills having led large projects 
          which involved multi-disciplinary teams and worked against tight  
          deadlines.`,
    socials: {
      twitter: "https://twitter.com/PrashantJha",
      linkedin: "https://www.linkedin.com/in/PrashantJha",
      facebook: "https://www.facebook.com/PrashantJha",
    },
  },
  {
    name: "Gaurav Malik",
    designation: "Technology Lead",
    image: Gaurav,
    description: `8+ years of experience in Financial Planning and Analysis, Data Analytics with organizations like EY, Vedanta Limited, Kotak Mahindra Bank Limited & other global MNCs.
          Handled Budgeting, Margin/Profitability Analysis, Financial modelling, Credit Rating, Due Diligence, Internal Management Reporting, External reporting like investor presentation, press release and Annual reports.`,
    socials: {
      twitter: "https://twitter.com/GauravMalik",
      linkedin: "https://www.linkedin.com/in/GauravMalik",
      facebook: "https://www.facebook.com/GauravMalik",
    },
  },
  {
    name: "Abhinav Aggarwal",
    designation: "Technology Lead",
    image: Abhinav,
    description: `8+ years of experience in Financial Planning and Analysis, Business transformation & Tool Implementation with organizations like Infosys Limited, Sumitomo & other global MNCs. 
          Handled Finance Transformation Projects, ERP & FP&A Tool Implementations, Process Improvement & Business Analytics projects.`,
    socials: {
      twitter: "https://twitter.com/AbhinavAggarwal",
      linkedin: "https://www.linkedin.com/in/AbhinavAggarwal",
      facebook: "https://www.facebook.com/AbhinavAggarwal",
    },
  },
];

const Leaders = () => {
  const [selectedMember, setSelectedMember] = React.useState<
    (typeof team)[0] | null
  >(null);

  const openModal = (member: (typeof team)[0]) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <section
        className="py-12 sm:py-16 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.05) 100%), linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(245, 245, 255, 0.05))",
        }}
      >
        <div className="w-full mx-auto text-center">
          <h3 className="group text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
              Meet Our Leaders
            </span>
          </h3>
          <p className="text-gray-600 mb-6 sm:mb-8 mx-auto max-w-2xl text-lg sm:text-xl">
            Driving innovation and growth through expertise and collaboration.
          </p>

          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 4000 })]}
            className="relative"
          >
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselContent className="flex items-stretch ml-0">
              {team.map((person, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 md:basis-1/3 px-3 "
                >
                  <div
                    className="relative rounded-2xl border-2 border-[#caa6f8] bg-white/10 backdrop-blur-md overflow-hidden shadow-xl flex flex-col items-center pt-16 pb-6 px-6 min-h-[330px] cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-[0.98]"
                    style={{
                      background: `
                    radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
                    linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))
                  `,
                    }}
                    onClick={() => openModal(person)}
                  >
                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[3px] rounded-full">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-white">
                        <Image
                          src={person.image}
                          alt={person.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-4 sm:mt-6">
                      {person.name}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 mt-1">
                      {person.designation}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 line-clamp-2 leading-relaxed">
                      {person.description}
                    </p>
                    <button
                      className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 bg-gray-100/50 border border-gray-200 rounded-full transition duration-300 hover:bg-gray-200/70 hover:border hover:border-[#caa6f8]"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(person);
                      }}
                    >
                      Read More
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="absolute -right-1 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </section>

      {/* Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-50 shadow-lg overflow-y-auto"
            style={{ transform: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full transition-all duration-200 bg-gray-100 hover:bg-gray-200 active:scale-95"
              onClick={closeModal}
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className="p-6 pt-16 max-w-md mx-auto">
              <div className="w-full h-64 sm:h-72 relative">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="w-full h-full object-contain rounded-md"
                  sizes="(max-width: 640px) 100vw, 500px"
                />
              </div>

              <h2 className="text-2xl text-gray-800 font-bold mt-6">
                {selectedMember.name}
              </h2>

              <p className="text-sm text-[#283c91] font-semibold mt-1">
                {selectedMember.designation}
              </p>

              <p className="text-sm text-gray-700 text-justify mt-4 leading-relaxed">
                {selectedMember.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leaders;
