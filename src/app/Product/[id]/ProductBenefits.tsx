import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allProductData, productData as defaultData } from "./data";
import { getIcon } from "./iconMap";
import { motion } from "framer-motion";

const ProductBenefits: React.FC<{ productId?: string }> = ({ productId }) => {
  const data = productId ? (allProductData[productId] ?? defaultData) : defaultData;
  const benefits = data.benefits;
  const productName = data.name;

  // Color schemes for different benefit types
  const colorSchemes = [
    { iconColor: "#059669", bgColor: "#D1FAE5" }, // Green - Efficiency
    { iconColor: "#2563EB", bgColor: "#DBEAFE" }, // Blue - Time
    { iconColor: "#DC2626", bgColor: "#FEE2E2" }, // Red - Cost
    { iconColor: "#7C3AED", bgColor: "#EDE9FE" }, // Purple - Collaboration
    { iconColor: "#EA580C", bgColor: "#FED7AA" }, // Orange - Accuracy
    { iconColor: "#059669", bgColor: "#D1FAE5" }, // Green - Compliance
  ];

  const getBenefitIcon = (iconName: string, index: number) => {
    const colorScheme = colorSchemes[index % colorSchemes.length];

    return (
      <span
        className="flex items-center justify-center rounded-lg"
        style={{
          width: "38px",
          height: "38px",
          background: colorScheme.bgColor,
          color: colorScheme.iconColor,
        }}
      >
        {getIcon(iconName, ``)}
      </span>
    );
  };

  return (
    <section className="py-8 bg-white">
      <div className="w-full mx-auto px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10">
        <div className="text-center mb-12">
          <motion.h2
            className="group text-2xl md:text-4xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-500 via-[#1e3a8a] to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient hover:animate-gradient-fast">
              Why Choose {productName}?
            </span>
          </motion.h2>

          <p className="mt-2 text-md text-gray-600 max-w-3xl mx-auto">
            Experience the transformative benefits that our {productName} solution brings to your organization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="hover:shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 rounded-2xl border-2 border-[#caa6f8]"
            >
              <CardHeader className="p-0">
                <div className="flex items-center justify-between">
                  {getBenefitIcon(benefit.icon, index)}

                  {benefit.metric && (
                    <span className="text-sm font-medium text-[#512F8D] bg-[#F2EDFF] backdrop-blur-md border border-white/30 shadow-sm px-3 py-1 rounded-full">
                      {benefit.metric}
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl mt-3">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0 pt-2">
                <CardDescription className="text-gray-600 text-md">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductBenefits;
