"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => { if (data.user) setIsLoggedIn(true); })
      .catch(() => {});
  }, []);

  const handleLogoClick = () => {
    if (isLoggedIn) return; // disable for any logged-in user
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 600);
    if (clickCount.current === 3) {
      clickCount.current = 0;
      router.push("/admin-fs9x7k");
    }
  };

  return (
    <div className="border-t border-gray-200">
      <div className="bg-gray-50 w-full flex flex-col md:flex-row md:justify-between md:items-start justify-center items-center md:px-10">
        {/* Logo + Social */}
        <div className="p-5">
          <ul>
            <div className="flex items-center pb-3 justify-center md:justify-start">
              <span className="!font-extrabold text-[#e97944] text-[32px]">FINSENSOR</span>
              <span
                className="!font-extrabold text-[#283c91] text-[32px] cursor-default select-none"
                onClick={handleLogoClick}
              >
                .AI
              </span>
            </div>
            <div className="flex gap-6 pb-5 justify-center md:justify-start">
              <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
              <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
              <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
              <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
              <FaFacebook className="text-2xl cursor-pointer hover:text-blue-600" />
            </div>
          </ul>
        </div>

        {/* Products */}
        <div className="p-5 text-center md:text-left">
          <ul>
            <p className="text-gray-800 font-bold text-3xl pb-4">Products</p>
            <li className="text-gray-600 pb-2 font-medium hover:text-blue-600 cursor-pointer">
              <Link href={"/Product/finsoeasy360"}>FinSoEasy360</Link>
            </li>
            <li className="text-gray-600 pb-2 font-medium hover:text-blue-600 cursor-pointer">
              <Link href={"/Product/lease-tool"}>LAMsoEasy360</Link>
            </li>
            <li className="text-gray-600 pb-2 font-medium hover:text-blue-600 cursor-pointer">RPTsoEasy360</li>
            <li className="text-gray-600 pb-2 font-medium hover:text-blue-600 cursor-pointer">FAMsoEasy360</li>
            <li className="text-gray-600 pb-2 font-medium hover:text-blue-600 cursor-pointer">ReconSoEasy360</li>
          </ul>
        </div>

        {/* Company */}
        <div className="p-5 text-center md:text-left">
          <ul>
            <p className="text-gray-800 font-bold text-3xl pb-4">Company</p>
            <li className="text-gray-600 pb-2 font-medium hover:text-blue-600 cursor-pointer">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="text-gray-600 pb-2 font-medium hover:text-blue-600 cursor-pointer">
              <Link href={"/about-us"}>About</Link>
            </li>
            <li className="text-gray-600 pb-2 font-medium hover:text-blue-600 cursor-pointer">
              <Link href={"/contact-us"}>Contact us</Link>
            </li>
            <li className="text-gray-600 pb-2 font-medium hover:text-blue-600 cursor-pointer">Products</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="p-5 text-center md:text-left">
          <ul>
            <p className="text-gray-800 font-bold text-3xl pb-4">Contact Information</p>
            <li className="text-gray-600 pb-2 font-medium">Address: G-22, II Floor Sector-3</li>
            <li className="text-gray-600 pb-2 font-medium">Noida, Uttar Pradesh-201301</li>
            <li className="text-gray-600 pb-2 font-medium">Phone: +91 95559 34205</li>
            <li className="text-gray-600 pb-2 font-medium">Email: info@finsensor.in</li>
          </ul>
        </div>
      </div>

      <Separator />

      {/* Bottom Copyright */}
      <div className="flex flex-col justify-center text-center p-5 bg-gray-50">
        <h1 className="text-gray-800 font-medium">
          © 2024-2026 All right reserved | Build with by{" "}
          <span className="hover:text-blue-600 font-medium cursor-pointer">
            Finsensor Ai Private Limited
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
