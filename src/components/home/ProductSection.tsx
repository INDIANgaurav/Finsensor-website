"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

import product1 from "@/../public/FinSoEasy Logo.png";
import product2 from "@/../public/Fixed Asset.png";
import product3 from "@/../public/Vendor Reconcilation.png";

// ✅ Properly typed variants for Framer Motion
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ProductSection = () => {
  const router = useRouter();

  const products = [
    {
      id: "finsoeasy360",
      productName: "FinSoEasy360",
      logo: product1.src,
      isComingSoon: false,
      gradient: "from-yellow-400 via-orange-500 to-pink-500",
      bgGradient: "from-[#2f0f0f] to-[#4b2c20]",
      description:
        "A powerful software for seamless financial statements preparation and reporting. Automate variance detection, resolve discrepancies, and generate Schedule III-compliant standalone and consolidated financial statements with real-time insights and user-friendly dashboards.",
    },
       {
      id: "lease-tool",
      productName: "LAMsoEasy360",
      logo: product3.src,
      isComingSoon: false,
      gradient: "from-pink-500 via-purple-500 to-indigo-500",
      bgGradient: "from-[#103d23] to-[#14bdd0]",
      description:
        "Our lease accounting and management tool is fully compliant with Ind AS 116, bringing advanced automation and accuracy to your financial reporting. ",
    },
    {
      id: "rpt",
      productName: "RPTsoEasy360",
      logo: product3.src,
      isComingSoon: true,
      gradient: "from-pink-500 via-purple-500 to-indigo-500",
      bgGradient: "from-[#7b7594] to-[#891aaf]",
      description:
        "Our Related Party Transaction tool automates elimination of intercompany and related party transactions, ensuring accurate, compliant, and efficient consolidated financial statements.",
    },
    {
      id: "famso-easy-360",
      productName: "FAMsoEasy360",
      logo: product2.src,
      isComingSoon: true,
      gradient: "from-green-400 via-cyan-500 to-blue-500",
      bgGradient: "from-[#02111d] to-[#0a3d62]",
      description:
        "Effortlessly manage and verify physical assets, ensuring compliance with Schedule III of the Indian Companies Act 2013. Streamline your Fixed Assets Schedule with accurate tracking and reporting, ensuring alignment with regulatory requirements.",
    },
    {
      id: "reconso-easy-360",
      productName: "ReconSoEasy360",
      logo: product3.src,
      isComingSoon: true,
      gradient: "from-pink-500 via-purple-500 to-indigo-500",
      bgGradient: "from-[#1a103d] to-[#320d3e]",
      description:
        "Identify and resolve discrepancies with detailed reasons for mismatches, ensuring your financial records reflect the true financial position. Stay on top of your financial reconciliation with instant, automated reports.",
    }
 
  ];

  return (
    <motion.section
      className="relative py-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        background: `
          radial-gradient(circle at center, rgba(255, 255, 200, 0.35) 0%, rgba(255, 255, 240, 0.2) 40%, rgba(255, 255, 255, 0.05) 80%),
          linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))
        `,
      }}
    >
      {/* Decorative Glows */}
      <div className="absolute w-96 h-96 bg-gradient-to-br from-[#ffffc859] to-transparent rounded-full blur-3xl opacity-50 top-[-5rem] left-[-4rem] pointer-events-none" />
      <div className="absolute w-80 h-80 bg-gradient-to-tr from-[#E0BBFF] to-transparent rounded-full blur-2xl opacity-40 bottom-[-4rem] right-[-3rem] pointer-events-none" />

      <div className="w-full mx-auto px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10 relative z-10">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-16">
          <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
            Explore Our Smart Finance Tools
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className={`relative overflow-hidden rounded-xl p-[2px] bg-gradient-to-r ${product.gradient} group`}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUpVariants}
            >
              <div
                className={`relative h-full z-10 rounded-xl p-6 text-white bg-gradient-to-br ${product.bgGradient} text-center flex flex-col`}
              >
                {/* Badge */}
                {product.isComingSoon && (
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${product.gradient} text-white shadow`}
                    >
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Logo with animation */}
                <motion.div
                  className="mb-6 flex justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="aspect-square w-24 h-24 rounded-full bg-white p-2 shadow-md flex items-center justify-center">
                    <Image
                      src={product.logo}
                      alt={product.productName}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed flex-1">
                  {product.description}
                </p>

                {/* Animated Button */}
                <div className="pt-4 mt-auto">
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button
                      onClick={() => router.push(`/Product/${product.id}`)}
                      disabled={product.isComingSoon}
                      className={`w-full text-base px-6 py-2 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r ${product.gradient} border-[1px] border-white text-white hover:shadow-lg`}
                    >
                      {product.isComingSoon ? "Coming Soon" : "View More"}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProductSection;
