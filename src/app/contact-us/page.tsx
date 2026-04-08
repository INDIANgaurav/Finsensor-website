"use client";

import {
  FaEnvelope,
  FaWhatsapp,
  FaLinkedin,
  FaUser,
  FaBuilding,
  FaPhone,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section
      className="py-16 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-14"
      style={{
        background:
          "radial-gradient(circle, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%), linear-gradient(to right, rgb(249, 248, 252), rgba(220, 197, 255, 0.21))",
      }}
    >
      {/* Heading */}
      <div className="text-center px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10">
        <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 xl:text-4xl">
          <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
            Contact Us
          </span>
        </h1>

        <p className="text-sm md:text-base max-w-2xl mx-auto text-neutral-700">
          Looking to collaborate on fintech innovation, financial strategy, or
          CA-led solutions? We&apos;re here to help—let&apos;s bring your vision
          to life.
        </p>
      </div>

      {/* Main Content */}
      <div className="mt-12 p-6 md:p-8 rounded-xl w-full mx-auto flex flex-col lg:flex-row gap-8 bg-white/30 backdrop-blur-md shadow-xl border border-neutral-300">
        {/* Form */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-800">
            Get in Touch
          </h3>
          <p className="mb-6 text-sm md:text-base text-neutral-700">
            Have questions or need a smarter way to manage finance and clients?
            Let’s talk.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="pl-10 bg-white/80 text-neutral-800 p-3 rounded w-full border border-neutral-500 focus:outline-none"
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                <input
                  type="email"
                  placeholder="Email"
                  className="pl-10 bg-white/80 text-neutral-800 p-3 rounded w-full border border-neutral-500 focus:outline-none"
                />
              </div>
              <div className="relative">
                <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="pl-10 bg-white/80 text-neutral-800 p-3 rounded w-full border border-neutral-500 focus:outline-none"
                />
              </div>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                <input
                  type="tel"
                  placeholder="+91 - Phone Number"
                  className="pl-10 bg-white/80 text-neutral-800 p-3 rounded w-full border border-neutral-500 focus:outline-none"
                />
              </div>
            </div>

            <textarea
              placeholder="Message"
              className="bg-white/80 text-neutral-800 p-3 rounded w-full min-h-[120px] border border-neutral-500 focus:outline-none"
            />

            <Button className="bg-[#042c47] hover:bg-[#e97944] text-white font-medium">
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex-1 bg-white/50 backdrop-blur-md p-10 rounded-xl border border-neutral-200">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-neutral-800">
              Address
            </h4>
            <p className="mb-6 text-sm md:text-base text-neutral-700 leading-relaxed">
              G-22, II Floor
              <br />
              Sector-3, Noida
              <br />
              Uttar Pradesh – 201301
            </p>

            <h4 className="text-xl font-semibold mb-2 text-neutral-800">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm md:text-base text-neutral-800">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#e97944]" />
                <a
                  href="mailto:info@finsensor.in"
                  className="hover:text-[#e97944] transition-colors duration-200"
                >
                  info@finsensor.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-green-600 font-bold" />
                <a
                  href="tel:+919555934205"
                  className="hover:text-green-600 transition-colors duration-200"
                >
                  +91 95559 34205
                </a>
              </li>
            </ul>
          </div>

          <p className="text-xs text-neutral-500 mt-6">
            We&apos;d love to hear from you—reach out anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
