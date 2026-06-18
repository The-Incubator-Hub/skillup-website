"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { APPLICATION_FORM_PATH } from "@/lib/forms";

export default function OverlayPopup() {
  const [isVisible, setIsVisible] = useState(false) 

  useEffect(() => {
    // Delay popup slightly to ensure it loads after page hydration
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300) 
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
      {/* Popup container */}
        <div className="relative bg-white rounded-lg shadow-lg flex flex-col lg:flex-row w-full max-w-[1095px] max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl sm:text-3xl z-10"
        >
          ×
        </button>

        {/* Left Section */}
        <div className="relative w-full lg:w-[500px] h-[250px] sm:h-[350px] lg:h-[631px] flex-shrink-0">
          {/* Rectangular Background */}
          <Image
            src="/images/rectangle-4467.png"
            alt="Background Shape"
            width={631}
            height={513}
            className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
            style={{ opacity: 0.84 }}
            priority
          />

          {/* Foreground Image */}
          <div className="absolute inset-2 sm:inset-4 lg:inset-0 z-2">
            <div className="relative w-full h-full lg:w-[370px] lg:h-[590px] lg:top-[15px] lg:left-[19px] rounded-lg overflow-hidden">
              <Image
                src="/images/popup_img.jpg"
                alt="Tech Trybe Plus learners"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Style image - hide on mobile, adjust position on larger screens */}
          <div className="hidden lg:block absolute rounded-lg overflow-hidden w-[854px] h-[753px] top-[505px] left-[354px] opacity-100 z-5">
            <Image
              src="/images/style.png"
              alt="Additional Graphic"
              fill
              priority
            />
          </div>
        </div>

        {/* Right Section */} 
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 flex-1 lg:w-[508px] gap-4 sm:gap-6 lg:gap-8">
          <p className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-800">
            Tech Trybe Plus
          </p>
          <h1 className="font-jost font-bold text-center text-2xl sm:text-3xl md:text-4xl lg:text-[56px] leading-tight lg:leading-[120%] text-[#101828] max-w-full lg:max-w-[461px]">
          Apply for the next cohort
          </h1>

          

          <p className="font-inter text-center text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[24px] text-[#344054] max-w-full lg:max-w-[460px]">
            Build practical, job-ready skills through a 3-month learning pipeline with live sync sessions, LMS content, mentorship, and project work.
          </p>

          <Link
            href={APPLICATION_FORM_PATH}
            onClick={() => {
              setIsVisible(false);
            }}
            className="inline-flex items-center justify-center bg-[#1E3B8A] text-white font-inter font-medium rounded-md hover:bg-blue-700 transition-all duration-300 w-full max-w-[444px] h-12 sm:h-14 lg:h-[56px] px-6 sm:px-8 text-sm sm:text-base"
          >
            Start Application
          </Link>
        </div>
      </div>
    </div>
  );
}
