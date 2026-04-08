"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Homepagemainimg from "../../../public/hero-home.png";

const HeroSection = () => {
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
      <div className="w-full mx-auto grid items-center gap-0 lg:gap-2 lg:grid-cols-2 py-1 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10 relative z-10">
        {/* Text Section */}
        <div
          className="space-y-4 sm:space-y-5 text-left"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          {/* Animated Gradient Text */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
            <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
              Join us on a journey
            </span>
            <br />
            where finance meets innovation.
          </h1>

          <p className="text-lg   font-normal text-[#010001] max-w-none lg:max-w-3xl">
            Finsensor is a pioneering company founded by a group of accomplished
            Chartered Accountants dedicated to revolutionizing the Fintech
            landscape. We combine financial expertise with technological
            innovation to deliver cutting-edge solutions in the ever-evolving
            financial sector.
          </p>

          <div className="mt-5 sm:mt-6">
            <Link href="/contact-us">
              <span
                className="text-white cursor-pointer bg-gradient-to-br from-purple-600 to-[#283c91] 
      hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
      focus:ring-blue-300 dark:focus:ring-blue-900 font-medium 
      rounded-lg text-lg sm:text-xl px-6 sm:px-8 py-3.5 sm:py-4 text-center inline-block
      shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300"
              >
                Explore More
              </span>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div
          className="relative flex justify-center xl:justify-end items-center"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <Image
            id="heroImg1"
            className="transition-transform duration-500 ease-in-out hover:scale-110 w-full max-w-xl lg:max-w-2xl"
            src={Homepagemainimg}
            alt="Awesome hero page image"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
