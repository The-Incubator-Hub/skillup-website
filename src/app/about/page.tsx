"use client"

import { Play, Monitor, Lightbulb, FileText, CheckCircle, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { NavbarWithDropdown } from "@/components/UI/navigation"
import Footer from "@/components/UI/Footer"
import Testimonials from "@/components/UI/Testimonials"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("years")

  const historyContent = {
    years: {
      title: "SkillUp Warri",
      description:
        "The Warri Skill-Up Invasion series has become a flagship initiative for empowering young people in Nigeria's South-South region with future-ready skills. Featuring two different editions, participants took part in hands-on, action-based learning programs designed to provide not just technical skills, but also access to valuable resources, entrepreneurial tools, and professional networks.",
      achievements: [
        "Delivered hands-on, action-based learning programs focused on digital skills and entrepreneurship",
        "Advanced our mission to grow tech talent in Africa",
        "Equipped participants to innovate, lead, and thrive in a digital-first world",
      ],
      stats: [
        { number: "384", label: "students enrolled" },
        { number: "8", label: "Courses Offered" },
      ],
      images: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756138215/Copy_of_IMG_2591_ecgb80.jpg"
    },
    phc: {
      title: "SkillUp Port Harcourt",
      description:
        "The SkillUp Port Harcourt brought together aspiring tech professionals and entrepreneurs from across Rivers State for an intensive week of training and empowerment. Participants engaged in hands-on, action-based learning programs designed to deliver practical digital skills, entrepreneurial resources, and access to valuable professional networks.",
      achievements: [
        "Delivered hands-on, action-based learning programs focused on digital skills and entrepreneurship",
        "Advanced our mission to grow tech talent in Africa",
        "Equipped participants to innovate, lead, and thrive in a digital-first world",
      ],
      stats: [
        { number: "117", label: "Students enrolled" },
        { number: "6", label: "Courses Offered" },
      ],
      images:"https://res.cloudinary.com/dq2jag0q6/image/upload/v1756138228/3_chvd7f.jpg"
    },
    kaduna: {
      title: "SkillUp Redemption Camp",
      description:
        "The SkillUp Redemption Camp brought together hundreds of aspiring tech professionals for an intensive week of digital skills development. Hosted at the RECTEM Lecture Halls, Redemption Camp, the program created a vibrant learning environment where participants engaged in hands-on training, gained access to vital resources, and built connections with mentors and industry peers.",
      achievements: [
        "Delivered hands-on, action-based learning programs focused on digital skills and entrepreneurship",
        "Strengthened our mission to grow tech talent in Africa",
        "Provided participants with access to resources, networks, and mentorship opportunities",
        "Empowered attendees to innovate, lead, and thrive in a digital-first economy",
      ],
      stats: [
        { number: "327", label: "Students enrolled" },
        { number: "4", label: "Courses Offered" },
      ],
      images: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756138214/2_vg7ltj.jpg"
    },
  } as const

  const currentContent = historyContent[activeTab as keyof typeof historyContent]

  const testimonials = [
    {
      quote:
        "Really love the whatsapp group like to say. Add more fellowship points, quotes, motivations, or even a way they share story about their journey and how they overcome challenges.",
      name: "Christine Mensa",
      image: "/placeholder.svg?height=50&width=50",
      rating: 5,
    },
    {
      quote:
        "Really love the whatsapp group like to say. Add more fellowship points, quotes, motivations, or even a way they share story about their journey and how they overcome challenges.",
      name: "Christine Mensa",
      image: "/placeholder.svg?height=50&width=50",
      rating: 5,
    },
    {
      quote:
        "Really love the whatsapp group like to say. Add more fellowship points, quotes, motivations, or even a way they share story about their journey and how they overcome challenges.",
      name: "Christine Mensa",
      image: "/placeholder.svg?height=50&width=50",
      rating: 5,
    },
    {
      quote:
        "Really love the whatsapp group like to say. Add more fellowship points, quotes, motivations, or even a way they share story about their journey and how they overcome challenges.",
      name: "Christine Mensa",
      image: "/placeholder.svg?height=50&width=50",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <NavbarWithDropdown />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 px-6 pt-32">
        <div className="max-w-4xl pl-12">
          {/* Line + Text */}
          <div className="flex items-center space-x-3 mb-2">
            <span className="w-12 h-[1px] bg-white"></span>
            <p className="text-white text-sm font-medium tracking-wider uppercase">ABOUT US</p>
          </div>

          {/* Heading */}
          <h1 className="text-white text-4xl md:text-5xl font-bold">Discover how we improve lives through technology and skills.</h1>
        </div>
      </div>


      {/* Main Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                First Choice for 
                <br />
                Tech Education Anywhere
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Whether you&apos;re starting fresh or advancing your career, SkillUp Global is your trusted partner for world-class tech education. We combine expert-led training, hands-on projects, and career support to shape the next generation of tech talent in Africa. From coding to data analytics, UI/UX design to cybersecurity, our programs are designed for real-world results helping you gain skills that open doors both locally and globally.

              </p>
            </div>

            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://res.cloudinary.com/dq2jag0q6/image/upload/v1756133369/1_zn9l2y.jpg"
                  alt="Students collaborating on technology projects"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="text-center mb-16">
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We provide professional tutoring that can help you break into tech and make an impact in your industry.
            </p>

            <div className="grid md:grid-cols-3 bg-[#EFF6FF] gap-8 p-4 rounded-lg ">
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">1K</div>
                <div className="text-gray-600">Students Reached</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">1K</div>
                <div className="text-gray-600">Graduates</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">1+</div>
                <div className="text-gray-600">Years</div>
              </div>
            </div>
          </div>



          {/* Why Choose Us Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Why You Should Start 
                <br />
                Learning With Us
              </h3>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm border-l-4 border-l-blue-500">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Monitor className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Promoting Digital Education</h4>
                        <p className="text-gray-600 text-sm">
                          Our comprehensive learning programs build both foundational and advanced tech skills equipping you for the modern workplace and positioning you among the most in-demand tech talent in Africa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm border-l-4 border-l-orange-500">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <Lightbulb className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Innovative Tech Workshops</h4>
                        <p className="text-gray-600 text-sm">
                          Engage in hands-on, immersive workshops focused on emerging technologies. We foster creativity, problem-solving, and practical application—ensuring you can turn knowledge into career growth.

                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm border-l-4 border-l-purple-500">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Online Resource Hub</h4>
                        <p className="text-gray-600 text-sm">
                          Access a centralized platform filled with tutorials, templates, and industry insights. Whether you&apos;re coding, designing, or strategizing, our resources make continuous learning and upskilling simple and accessible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="https://res.cloudinary.com/dq2jag0q6/image/upload/v1756146453/man-siting_s0xaoh.jpg"
                alt="Happy student with book giving thumbs up"
                width={350}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full h-full"
                unoptimized
              />
            </div>
          </div>


        </div>
      </section>
        {/* Our History Section */}
          <section className="mb-16 py-16 px-6 ">
            <div className="max-w-6xl mx-auto ">
              <div className="mb-8 md:flex md:justify-between">
                <h2 className="text-5xl font-bold text-gray-900 mb-4 mt-22">Our History</h2>
                <p className="text-gray-600 max-w-2xl">
                At SkillUp Global, our mission is to clearly bridge Africa&apos;s digital divide and empower communities with the tools to thrive in a fast-evolving world. As one of Nigeria&apos;s leading digital skills bootcamps and online tech training providers, we&apos;ve impacted nearly 1,000 learners through our flagship programs.


                </p>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-4 mb-8 mt-22 items-center justify-center">
                <button
                  onClick={() => setActiveTab("years")}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    activeTab === "years" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Skillup Warri
                </button>
                <button
                  onClick={() => setActiveTab("phc")}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    activeTab === "phc" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Skillup PHC
                </button>
                <button
                  onClick={() => setActiveTab("kaduna")}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    activeTab === "kaduna" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Skillup Redemption Camp
                </button>
              </div>

              {/* Tab Content */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#0D4EFF] mb-4">{currentContent.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{currentContent.description}</p>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-3">
                      {currentContent.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {currentContent.stats.map((stat, index) => (
                      <div key={index} className="text-center rounded-md p-2 bg-[#9FBDFA]/25 ">
                        <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                        <div className="text-[#0D43FF] text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  
                  <Image
                    
                    src={currentContent.images}
                    alt={`Image ${currentContent.images + 1}`}
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg w-full max-w-md"
                    unoptimized
                  />
                  
                </div>
              </div>
            </div>
          </section>
      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full translate-y-40 -translate-x-40"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Our Growing Community</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Be part of Africa&apos;s digital transformation. Whether you&apos;re a learner, partner, or supporter, there&apos;s a place for you in our mission. From digital skills bootcamps to online tech training in Nigeria, we are building the next generation of tech talent in Africa. Together, we can empower communities, close the digital divide, and create opportunities for all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 border border-white text-white rounded-lg hover:bg-gray-300 transition-colors duration-200">
              Join A Program
            </button>
            <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <button className="px-8 py-4 rounded-lg text-white bg-black font-medium hover:text-gray-300 transition-colors duration-200">
            Explore Courses
          </button>
        </div>
      </section>
      <Footer />
    </div>
  )
}
