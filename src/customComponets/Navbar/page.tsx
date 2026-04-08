import React from "react";
import Logo from "./Logo";
import { NavigationBar } from "./Navigation-bar";
import ActionButtons from "./action-buttons";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="bg-white sticky top-0 z-50">
      <div className="flex w-full mx-auto justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 border-b h-16">
        <Link href="/" className="flex items-center">
          <span className="font-extrabold text-[#e97944] text-[35px]">
            FINSENSOR
          </span>
          <span className="!font-extrabold text-[#283c91] text-[35px]">
            .AI
          </span>
        </Link>
        <NavigationBar />
        <ActionButtons />
      </div>
    </div>
  );
};

export default Navbar;
