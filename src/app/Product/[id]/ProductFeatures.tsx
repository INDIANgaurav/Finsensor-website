import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allProductData, productData as defaultData } from "./data";
import { getIcon } from "./iconMap";

const ProductFeatures: React.FC<{ productId?: string }> = ({ productId }) => {
  const data = productId ? (allProductData[productId] ?? defaultData) : defaultData;
  const features = data.features;
  const productName = data.name;

  const gradient = "from-blue-500 via-indigo-600 to-purple-500";

  return (
    <section className="py-16 bg-gray-50">
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
              Key Features of {productName}
            </span>
          </motion.h2>

          <p className="mt-2 text-md text-gray-600 max-w-3xl mx-auto">
            Discover the powerful features that make {productName} the ultimate
            financial reporting solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-2xl p-[2px] bg-gradient-to-r ${gradient} hover:shadow-xl transition duration-300`}
            >
              <Card className="h-full rounded-2xl bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`bg-clip-text bg-gradient-to-r ${gradient}`}
                    >
                      {getIcon(
                        feature.icon,
                        `bg-clip-text bg-gradient-to-r ${gradient}`
                      )}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {feature.bullets && feature.bullets.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
                      {feature.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
