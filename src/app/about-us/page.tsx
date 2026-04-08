"use client";
import React from "react";
import Mainsection from "./Herosection";
import Vision from "./Vision";
import Mission from "./Mission";
import WhyUs from "@/app/about-us/WhyUs";
import Overstory from "./OurStory";
import Link from "next/link";

const page = () => {
  return (
    <div className="max-w-full">
      <Mainsection />
      <Overstory />
      <Vision />
      <Mission />
      <WhyUs />
      <section
        className="  text-white"
        style={{
          backgroundImage:
            "url(https://msmcoretech.com/assets/images/front-img/btn-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-[#000000bd] py-16">
          <div className="w-full mx-auto px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10 text-center">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-4">
                Ready to see how FinSensor empowers <br /> businesses like
                yours?
              </h3>
              <p className="text-white/90 text-md max-w-2xl mx-auto">
                From fintech to retail, we drive impact with custom financial
                technology strategies. Learn what makes us the trusted choice
                across industries.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/contact-us"
                className="mt-6 inline-block text-white cursor-pointer bg-[#042c47] border-2 border-white font-medium  rounded-lg text-lg px-5 py-2 text-center   shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300"
              >
                Connect with Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default page;
