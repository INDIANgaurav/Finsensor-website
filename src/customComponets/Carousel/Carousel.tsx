import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import report1 from "@/../../public/Report1.png";
import report2 from "@/../../public/Report2.png";
import report3 from "@/../../public/Report3.png";
import report4 from "@/../../public/Report4.png";
import chat1 from "@/../../public/Chat1.png";
import sync1 from "@/../../public/Sync1.png";
import Notes1 from "@/../public/Notes1.png";
import Notes2 from "@/../public/Notes2.png";

const DashboardAndReport = [report1, report2, report3, report4];
const Unitandsync = [chat1, sync1];
const Notes = [Notes1, Notes2];
const Carousel = ({ slidename }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides =
    slidename == "Dashboard&Report"
      ? [...DashboardAndReport]
      : slidename == "Unti&Sync"
      ? [...Unitandsync]
      : slidename == "Notes"
      ? [...Notes]
      : [];
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: any) => {
    setCurrentSlide(index);
  };
  const slidesLen = slides.length;
  const slideRef = useRef(slidesLen);
  slideRef.current = slidesLen;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideRef.current);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-full grid items-center"
      data-carousel="slide"
    >
      <div className="relative sm:h-[280px] h-[200px] overflow-hidden group ">
        {slides &&
          slides?.map((slide: any, index: any) => (
            <div
              key={index}
              className={`border-[1px] p-1 border-gray-500 rounded-md duration-700 ease-in-out absolute top-0 left-0 transition-opacity ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide}
                alt={`Slide ${index + 1}`}
                className="object-contain rounded-md w-full h-auto"
              />
            </div>
          ))}

        {/* Slider indicators, smaller and positioned at the bottom center */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-1">
          {slides.map((_: any, index: any) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? "bg-[#1e3a8a]" : "bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
