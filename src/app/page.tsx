"use client";
import CTASection from "@/components/home/CTASection";
import Footer from "@/customComponets/Footer/page";
import Leaders from "@/components/home/Leaders";
import Navbar from "@/customComponets/Navbar/page";
import Products from "@/components/home/ProductSection";
import HeroSection from "@/components/home/HeroSection";
import Whowe from "@/components/home/Whowe";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const AOS = require("aos");
    AOS.init();
  }, []);

  return (
    <main>
      <Navbar />
      <div>
        <HeroSection />
        <Whowe />
        <Products />
        <Leaders />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
