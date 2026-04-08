import Link from "next/link";
import React from "react";

const CTASection = () => {
  return (
    <div
      className="text-center bg-gray-50 py-10 my-6 px-4 sm:px-2 md:px-4 lg:px-7 xl:px-10"
      style={{
        backgroundImage:
          "url('https://www.msmcoretech.com/public/assets/images/front-img/contact-bg.jpg')",
      }}
    >
      <h3 className="text-2xl font-bold text-black mb-4">
        Need a Custom Solution?
      </h3>
      <p className="text-black mb-6 max-w-2xl mx-auto">
        Our team can create a tailored solution that perfectly fits your
        organization&apos;s unique requirements. Get in touch to discuss your
        needs and discover how FinSoEasy360 can transform your financial
        reporting.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/contact-us"
          className="mt-6 inline-block text-white cursor-pointer bg-[#042c47] border-2 border-white font-medium  rounded-lg text-lg px-5 py-2 text-center   shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          onClick={() => window.open("/contact-us", "_blank")}
        >
          Contact Sales Team
        </Link>
      </div>
    </div>
  );
};

export default CTASection;
