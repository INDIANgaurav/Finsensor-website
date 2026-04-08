"use client";

import React from "react";
import { motion } from "framer-motion";
import ProductHeroSection from "./ProductHeroSection";
import LAMHeroSection from "./LAMHeroSection";
import ProductFeatures from "./ProductFeatures";
import ProductBenefits from "./ProductBenefits";
import CTASection from "./CTASection";
import FaqFinSoEasy from "@/customComponets/Faq/Faq";
import InAction from "./InAction";
import { ProductPageProps } from "./types";
import { getProductData } from "./data";

// Coming Soon Component
const ComingSoon: React.FC<{ productName: string }> = ({ productName }) => {
  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
          linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))
        `,
      }}
    >
      {/* Decorative Glows */}
      <div className="absolute w-96 h-96 bg-gradient-to-br from-[#E0BBFF] to-transparent rounded-full blur-3xl opacity-50 top-[-5rem] left-[-4rem] pointer-events-none" />
      <div className="absolute w-80 h-80 bg-gradient-to-tr from-[#ffffc859] to-transparent rounded-full blur-2xl opacity-40 bottom-[-4rem] right-[-3rem] pointer-events-none" />

      <div className="text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Coming Soon
            </span>
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {productName}
        </motion.p>

        <motion.p
          className="text-lg text-gray-600 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          We&apos;re working hard to bring you something amazing. Stay tuned!
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProductPageClient: React.FC<ProductPageProps> = ({ params }) => {
  const productData = getProductData(params.id);
  const isComingSoon = params.id !== 'finsoeasy360' && params.id !== 'lease-tool';

  if (isComingSoon) {
    return (
      <div className="min-h-screen">
        <ComingSoon productName={productData?.name || 'Product'} />
        <CTASection />
      </div>
    );
  }

  if (params.id === 'lease-tool') {
    return (
      <div className="min-h-screen">
        <LAMHeroSection />
        <ProductFeatures productId="lease-tool" />
        <ProductBenefits productId="lease-tool" />
        <CTASection />
      </div>
    );
  }

  // finsoeasy360 full page
  return (
    <div className="min-h-screen">
      <ProductHeroSection />
      <ProductFeatures />
      <InAction />
      <ProductBenefits />
      <CTASection />
      <FaqFinSoEasy ShowFaqName="FaqFinsSoEasy360" />
    </div>
  );
};

export default ProductPageClient;
