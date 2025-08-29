"use client"
import { NavbarWithDropdown } from "@/components/UI/navigation" 
import Footer from "@/components/UI/Footer"
import { Monitor, Video, Link, CheckCircle, Star, ChevronDown, ChevronUp, Clock, Users, Award, Globe } from "lucide-react"
import Image from "next/image"
import { useState,useEffect } from "react"
import { Button } from "@/components/UI/button"
import {
  Bookmark,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

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

function ProgramCard({ program, index }: ProgramCardProps) {
  return (
    <div className="overflow-hidden hover:shadow-lg transition-shadow bg-white rounded-2xl border border-gray-200">
      <div className="relative">
        <Image
          src={program.image || "/placeholder.svg"}
          alt={program.title}
          width={402}
          height={300}
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-t-2xl"
        />

        {/* Show "Coming Soon" only if NOT the first card */}
        {index !== 0 && (
          <div className="absolute bottom-4 left-4 bg-white text-gray-600 flex items-center gap-2 px-3 py-1 rounded-full shadow-md">
            <Clock className="h-4 w-4" />
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

      <div className="p-4 sm:p-6">
        <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-blue-800 mb-2">
          {program.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{program.description}</p>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 hover:bg-gray-100 transition-colors">
            <Bookmark className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700 font-medium">
              {program.projects}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 hover:bg-gray-100 transition-colors">
            <Clock className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700">{program.duration}</span>
          </div>
        </div>

        {/* Waitlist + Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Profile images + count */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {program.profileImages?.slice(0, 3).map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Profile ${i + 1}`}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="ml-3 text-sm text-gray-700">
              {program.waitlistCount} people on waitlist
            </span>
          </div>

          {/* Button */}
          <button className="w-full sm:w-auto bg-white border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-all">
            Join Waitlist Now
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="overflow-hidden hover:shadow-lg transition-shadow bg-white rounded-2xl border border-gray-200">
      <div className="relative">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          width={402}
          height={237}
          className="w-full h-48 sm:h-56 object-cover rounded-t-2xl"
        />
        <div className="absolute bottom-4 left-4 bg-white text-gray-600 flex items-center gap-2 px-3 py-1 rounded-full shadow-md">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Coming Soon</span>
        </div>
        <Button
          size="sm"
          className="absolute top-4 right-4 bg-white text-gray-900 hover:bg-gray-100"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 mb-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 hover:bg-gray-100 transition-colors">
            <Bookmark className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700 font-medium">
              {course.lessons}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 hover:bg-gray-100 transition-colors">
            <Clock className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700">{course.duration}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-blue-900 font-bold text-lg">
            {course.price}
          </div>
          <button className="w-full sm:w-auto bg-white border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-all">
            Enroll now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BootcampPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedModules, setExpandedModules] = useState<{ [key: string]: boolean }>({});

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const coursesData: Course[] = [
    {
      title: "Virtual Assistant Masterclass",
      description:
        "Learn how to become a high-earning Virtual Assistant with skills in scheduling, email management, content creation, and AI-powered productivity tools.",
      lessons: "40 Lessons",
      duration: "12h 25mins",
      price: "₦100,000",
      image: "/images/explore.jpg",
    },
    {
      title: "AI/ML Intermediate Program",
      description:
        "Step into the future of work with intermediate-level Artificial Intelligence and Machine Learning skills.",
      lessons: "5 Live Projects",
      duration: "3 months",
      price: "₦200,000",
      image: "/images/software.jpg",
    },
    {
      title: "Project Management Essentials",
      description:
        "Learn Agile, Scrum, and digital collaboration platforms while working on real-world case studies.",
      lessons: "40 Lessons",
      duration: "12h 25mins",
      price: "₦200,000",
      image: "/images/data_analysis.jpg",
    },
  ];
  
  const courseModules = [
    {
      id: "software-development",
      title: "Software Development",
      duration: "6 weeks",
      lessons: [
        "Build scalable applications and master coding best practices.",
      ],
    },
    {
      id: "data-science-and-analytics", 
      title: "Data Science & Analytics",
      duration: "6 weeks",
      lessons: ["Learn to analyze, visualize, and interpret data for real impact."],
    },
    {
      id: "product-design",
      title: "Product Design (UI/UX)",
      duration: "6 weeks",
      lessons: ["Design user-centered digital products with industry tools."],
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      duration: "6 weeks",
      lessons: ["Drive growth with digital campaigns and performance strategies."],
    },
    {
      id: "projects",
      title: "Project Management",
      duration: "6 weeks",
      lessons: ["Lead teams, manage sprints, and deliver impactful projects."],
    },
  ];

  const programsData: Program[] = [
    {
      title: "Virtual Assistant Masterclass (Coming Soon)",
      description:
        "Learn how to become a high-earning Virtual Assistant with skills in scheduling, email management, content creation, and AI-powered productivity tools.",
      duration: "3 Months",
      projects: "Practical, mentor-led sessions + project-based learning",
      image: "/images/techtribe.png",
      waitlistCount: 50,
      profileImages: ["/images/pic.png", "/images/pic.png", "/images/pic.png"],
    },
    {
      title: "AI NOW Bootcamp",
      description:
        "Be part of Africa's biggest push to build world-class tech talent. Through our Tech Scholarship Drive, you'll gain fully sponsored access to cutting-edge training. Over 4 months, you'll work on real-world projects, collaborate with mentors, and unlock career opportunities in the booming digital economy.",
      duration: "4 Months",
      projects: "Scholarship-based, hands-on training with live projects",
      image: "/images/futureclan.png",
      waitlistCount: 32,
      profileImages: ["/images/pic.png", "/images/pic.png", "/images/pic.png"],
    },
  ];

  const maxSlides = coursesData.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

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
    <div className="min-h-screen relative bg-white flex flex-col ">
      <NavbarWithDropdown />
      
      {/* Header */}
      <div className="border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tech Tribe Bootcamp</h1>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-600 ml-2">(5.0)</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
              <Users className="w-4 h-4" />
              Favorites
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
              <Globe className="w-4 h-4" />
              Share
            </span>
          </div>
        </div>
      </div>

      <section className=" mx-auto px-20 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Hero Image */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/landscapetribe.png"
                alt="Tech Tribe Bootcamp - Students working on laptops"
                width={800}
                height={400}
                className="w-full h-48 sm:h-64 lg:h-auto object-cover"
              />
            </div>

            {/* About Section */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">About Tech Tribe</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TechTrybe Bootcamp is a 6-week, fully virtual, instructor-led program designed for graduates, young professionals, and mid-level talent.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Through live classes, mentorship, and career support, you&apos;ll gain job-ready digital skills, build a standout portfolio, and position yourself to upskill, pivot, or accelerate your career in today&apos;s most in-demand digital fields.
              </p>
            </section>

            {/* What Will You Gain */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">By the end of the bootcamp, you will:</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Gain job-ready skills in your chosen track</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Build mini projects and a capstone project for your portfolio</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Access career support, mentorship & job placement partners</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Join a vibrant community of tech talent & industry experts</span>
                </div>
              </div>
            </section>

            {/* Course Curriculum */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Course Tracks</h2>
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Available Tracks</h3>
                  <span className="text-sm text-gray-600">{courseModules.length} Tracks</span>
                </div>

                <div className="space-y-4">
                  {courseModules.map((module, index) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg bg-white">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{module.title}</h4>
                          </div>
                        </div>
                        {expandedModules[module.id] ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>

                      {expandedModules[module.id] && (
                        <div className="px-4 pb-4">
                          <div className="pl-8 sm:pl-12">
                            <ul className="space-y-2">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="flex items-center gap-3 text-sm text-gray-700">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                                  {lesson}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Related Programs */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Related Programs</h2>
              <div className="transition-all duration-500 ease-in-out">
                {/* Mobile Slider */}
                <div className="block sm:hidden">
                  <div className="relative">
                    <div className="overflow-hidden rounded-2xl">
                      <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {coursesData.map((item, index) => (
                          <div
                            key={index}
                            className="w-full flex-shrink-0 px-2"
                          >
                            <CourseCard course={item} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrows */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-10 disabled:opacity-50"
                      disabled={currentSlide === 0}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-10 disabled:opacity-50"
                      disabled={currentSlide === maxSlides - 1}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Indicators */}
                    <div className="flex justify-center mt-6 gap-2">
                      {coursesData.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentSlide
                              ? "bg-blue-600 w-6"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden sm:block">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coursesData.map((course, index) => (
                      <CourseCard key={index} course={course} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm sticky top-6">
              <button 
              onClick={() => {
              setIsVisible(false);
              window.location.href = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=TCXhY7Vn2k6hjUKOEi376VkaEKgVIcNBhNb9TXKt06lUQ1BVQTVOVjVMTE4wMklGVjlUSUVDOFdOQi4u";
            }}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 mb-6">
                Enroll now
              </button>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Fully Online (Live + LMS + Mentorship)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Commitment: 6 - 10 hours weekly</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">6 Weeks</span>
                </div>
                <div className="flex items-start gap-3">
                  <Link className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Limited Access</span>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Certificate upon completion</span>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Instructor</h3>
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="Instructor"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">SkillUp Global</p>
                  <p className="text-sm text-gray-600">skilluplimited@gmail.com</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Our mission is simple but powerful to bridge Africa&apos;s digital divide and empower individuals to thrive in today&apos;s fast-evolving tech world. Through our intensive, hands-on training, we&apos;ve already impacted nearly 1,000 learners across our flagship programs, helping them pivot into tech, grow their freelance businesses, or advance their careers. At SkillUp Global, we don&apos;t just teach skills we build confidence, portfolios, and pathways to real opportunities.
              </p>
            </div>

            {/* Program Schedule */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Your 6-Week Journey</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Week 1: Orientation & Fundamentals Review</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Week 2: Core Skill Building & Mini Project 1</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Week 3: Applied Projects & Guest Masterclass</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Week 4: Advanced Topics & Career Workshops</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Week 5: Capstone Project</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Week 6: Demo Day & Career Launch</span>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Requirements</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">A laptop with stable internet connection</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Prior knowledge in the chosen course area</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Commitment to attend class or re-watch.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Willingness to complete assignments and practical projects.</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Product Design</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Programs</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Professional</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Software Development</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Data Science & Analytics</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Project Management</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">Digital Marketing</span>
              </div>
            </div>

            {/* Audience */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Audience</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Working professionals ready to level up.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Entrepreneurs who want smarter, tech-enabled businesses.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Anyone with basic knowledge who wants practical growth.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Freelancers aiming for advanced skills.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Anyone who loves organizing & planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}