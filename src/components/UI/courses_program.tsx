"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/UI/button";  
import { 
  Clock, 
  Bookmark,  
  ExternalLink,  
  ChevronLeft, 
  ChevronRight,
} from "lucide-react";
    
// =====================
// TYPE DEFINITIONS
// ===================== 
interface Course {
  title: string;
  description: string;
  lessons: string;
  duration: string;
  price: string;
  image: string;
}
interface Program {
  title: string;
  description: string;
  duration: string;
  projects: string;
  image: string;
  waitlistCount: number;
  profileImages: string[];
}
interface ProgramCardProps {
  program: Program;
  index: number;
}

// =====================
// MAIN COMPONENT
// =====================
export default function CoursesProgramsSection() {
  const [activeTab, setActiveTab] = useState<"courses" | "programs">(
    "programs"
  ); 
  const [currentSlide, setCurrentSlide] = useState(0);

  const coursesData: Course[] = [
    {
      title: "Virtual Assistant Masterclass",
      description:
        "Learn how to become a high-earning Virtual Assistant with skills in scheduling, email management, content creation, and AI-powered productivity tools.",
      lessons: "40 Lessons",
      duration: "12h 25mins",
      price: "₦100,000",
      image: "/images/Virtual Assistant.jpg",
    },
    {
      title: "AI/ML Intermediate Program",
      description:
        "Step into the future of work with intermediate-level Artificial Intelligence and Machine Learning skills.",
      lessons: "5 Live Projects",
      duration: "3 months",
      price: "₦200,000",
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756134134/AI_ML_Intermediate__bbn38u.jpg",
    },
    {
      title: "Project Management Essentials ",
      description:
        "Learn Agile, Scrum, and digital collaboration platforms while working on real-world case studies.",
      lessons: "40 Lessons",
      duration: "12h 25mins",
      price: "₦200,000",
      image: "/images/Project Management.jpg",
    },
    {
      title: "Web Development Mastery",
      description:
        "Build responsive, user-friendly websites from scratch using HTML, CSS, JavaScript, and modern frameworks.",
      lessons: "5 Live Projects",
      duration: "3 Months",
      price: "₦150,000",
      image: "/images/Web Development.jpg",
    },
    {
      title: "Data Analysis & Visualization ",
      description:
        "Work with real datasets, build dashboards, and develop problem-solving skills that employers seek worldwide.",
      lessons: "5 Live Projects",
      duration: "3 Months",
      price: "₦200,000",
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756134138/Data_Analysis_Visualization_j3ad4a.jpg",
    },
    {
      title: "Product Design & UX/UI ",
      description:
        "Master the art of designing intuitive, user-focused digital products with Figma, design systems, and prototyping tools.",
      lessons: "5 Live Projects",
      duration: "3 Months",
      price: "₦200,000",
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756134166/Product_Design_UX_UI_o357u2.jpg",
    },
  ];

  const programsData: Program[] = [
    {
      title: "Tech Tribe Bootcamp",
      description:
        "Master in-demand digital skills and gain hands-on experience that gets you job-ready. Perfect for beginners and career switchers who want to learn tech in Africa and compete on a global stage",
      duration: "3 Months",
      projects: "Practical, mentor-led sessions + project-based learning",
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756134179/tribe_ycwxxg.jpg",
      waitlistCount: 50,
      profileImages: ["/images/pic.png", "/images/pic.png", "/images/pic.png"],
     
    },
    {
      title: "AI NOW Bootcamp",
      description:
        "Be part of Africa's biggest push to build world-class tech talent. Through our  Tech Scholarship Drive, you'll gain fully sponsored access to cutting-edge training. Over 4 months, you'll work on real-world projects, collaborate with mentors, and unlock career opportunities in the booming digital economy.",
      duration: "4 Months",
      projects: "Scholarship-based, hands-on training with live projects",
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756134122/ai_now_wtzyup.jpg",
      waitlistCount: 32,
      profileImages: ["/images/pic.png", "/images/pic.png", "/images/pic.png"],
    },
  ];

  const currentData = activeTab === "courses" ? coursesData : programsData;
  const maxSlides = currentData.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const handleTabChange = (tab: "courses" | "programs") => {
    setActiveTab(tab);
    setCurrentSlide(0);
  };

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-20">
        {/* Heading + Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-[40px] leading-[120%] text-[#14183E]">
            {activeTab === "courses"
              ? "Courses We Offer."
              : "Interested In Our Programs?"}
          </h2>

          <div className="flex gap-1 bg-[#DBEAFE] rounded-md p-2 items-center w-full max-w-[320px] h-[72px] mx-auto lg:mx-0">
            <button
              onClick={() => handleTabChange("programs")}
              className={`flex-1 h-[56px] rounded-md px-4 py-4 text-base lg:text-[20px] font-medium text-center leading-[24px] transition ${
                activeTab === "programs"
                  ? "bg-[#1E40AF] text-white"
                  : "text-[#1E3B8A] hover:bg-blue-100 transiton all"
              }`}
            >
              Programs
            </button>
            <button
              onClick={() => handleTabChange("courses")}
              className={`flex-1 h-[56px] rounded-md px-4 py-4 text-base lg:text-[20px] font-medium text-center leading-[24px] transition ${
                activeTab === "courses"
                  ? "bg-[#1E40AF] text-white"
                  : "text-[#1E3B8A] hover:bg-blue-100 transiton all"
              }`}
            >
              Courses
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-500 ease-in-out">
          {/* Mobile Slider */}
          <div className="block md:hidden">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {currentData.map((item, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 flex items-center justify-center px-2"
                    >
                      {activeTab === "courses" ? (
                        <CourseCard course={item as Course} />
                      ) : (
                        <ProgramCard program={item as Program} index={index} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all z-10"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all z-10"
                disabled={currentSlide === maxSlides - 1}
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {currentData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-[#1E40AF] w-6"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:block">
            {activeTab === "courses" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {coursesData.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {programsData.map((program, index) => (
                  <ProgramCard key={index} program={program} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================
// COURSE CARD
// =====================
function CourseCard({ course }: { course: Course }) {
  return (
    <div className="overflow-hidden hover:shadow-lg transition-shadow bg-white rounded-[16px]">
      <div className="relative">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          width={402}
          height={237}
          className="w-full h-48 object-cover rounded-t-[16px] ]"
          unoptimized
        />
        <div className="absolute bottom-4 left-4 bg-white text-[#52525B] flex items-center gap-2 px-3 py-1 rounded-full shadow-md">
          <Clock className="h-4 w-4 text-[#52525B]" />
          <span className="text-sm font-medium">Coming Soon</span>
        </div>
        <Button
          size="sm"
          className="absolute top-4 right-4 bg-white text-gray-900 hover:bg-gray-100"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl lg:text-[28px] text-[#101828] mb-2">
          {course.title}
        </h3>
        <p className="text-sm text-[#667085] mb-4">{course.description}</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
          <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-4 h-10 hover:bg-zinc-300">
            <Bookmark className="h-4 w-4 text-[#52525B]" />
            <span className="text-sm text-[#52525B] font-medium">
              {course.lessons}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-4 h-10 hover:bg-zinc-300">
            <Clock className="h-4 w-4 text-[#52525B]" />
            <span className="text-sm text-[#52525B]">{course.duration}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-blue-900 font-bold text-lg lg:text-[20px]">
            {course.price}
          </div>
          <button className="bg-white border-2 border-blue-600 hover:bg-blue-900 text-black hover:text-white text-sm lg:text-[20px] px-4 lg:px-6 py-3 rounded-md transition-all">
            Enroll now
          </button>
        </div>
      </div>
    </div>
  );
}

// =====================
// PROGRAM CARD
// =====================
function ProgramCard({ program, index }: ProgramCardProps) {
  const handleWaitlistClick = () => {
  if (index === 0) {
    // TechTribe program - redirect to specific page
    window.location.href = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=TCXhY7Vn2k6hjUKOEi376VkaEKgVIcNBhNb9TXKt06lUQ1BVQTVOVjVMTE4wMklGVjlUSUVDOFdOQi4u";
  } else {
    // AI NOW or other programs - show coming soon or different action
    alert("Coming Soon! We'll notify you when this program opens for enrollment.");
  }
};
  return (
    <div className="overflow-hidden hover:shadow-lg transition-shadow bg-white rounded-[16px]">
      <div className="relative">
        <Image
          src={program.image || "/placeholder.svg"}
          alt={program.title}
          width={402}
          height={300} // Increased image height
          className="w-full h-72 object-cover rounded-t-[16px] text-[#14183E]"
          unoptimized
        />

        {/* Show "Coming Soon" only if NOT the first card */}
        {index !== 0 && (
          <div className="absolute bottom-4 left-4 bg-white text-[#52525B] flex items-center gap-2 px-3 py-1 rounded-full shadow-md">
            <Clock className="h-4 w-4 text-[#52525B]" />
            <span className="text-sm font-medium">Coming Soon</span>
          </div>
        )}

        <Button
          size="sm"
          className="absolute top-4 right-4 bg-white text-gray-900 hover:bg-gray-100"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl lg:text-[28px] text-[#1E3B8A] mb-2">
          {program.title}
        </h3>
        <p className="text-sm text-[#667085] mb-4">{program.description}</p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
          <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-4 h-10 hover:bg-zinc-300">
            <Bookmark className="h-4 w-4 text-[#52525B]" />
            <span className="text-sm text-[#52525B] font-medium">
              {program.projects}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-4 h-10 hover:bg-zinc-300">
            <Clock className="h-4 w-4 text-[#52525B]" />
            <span className="text-sm text-[#52525B]">{program.duration}</span>
          </div>
        </div>

        {/* Waitlist + Button in same row */}
        <div className="flex items-center justify-between mt-4">
          {/* Left side: profile images + count */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {program.profileImages?.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Profile ${i + 1}`}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                  unoptimized
                />
              ))}
            </div>
            <span className="ml-3 text-sm text-gray-700">
              {program.waitlistCount} people on waitlist
            </span>
          </div>

          {/* Right side: button */}
          <button 
          onClick={handleWaitlistClick}
          className="bg-white border-2 border-blue-600 hover:bg-blue-900 text-black hover:text-white text-sm lg:text-[20px] px-4 lg:px-6 py-3 rounded-md transition-all">
            Join Waitlist Now
          </button>
        </div>
      </div>
    </div>
  );
}
