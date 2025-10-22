"use client"

import type React from "react"

import { Button } from "@/components/UI/button";  
import { Input } from "@/components/UI/input";
import { NavbarWithDropdown } from "@/components/UI/navigation";
import Footer from "@/components/UI/Footer";
import Faq from "@/components/UI/Faq";
import Link from "next/link"; 
import Image from "next/image"; 
import { Mail, Phone, MapPin,X, Facebook, Twitter, Linkedin, Instagram, Dribbble,Youtube } from "lucide-react"
import { useState } from "react"

export default function ContactSection(){ 

    const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    subject: "",  
    company: "",
    message: "",
  }) 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here 
  }
  return (
    <div className="min-h-screen relative">
      <NavbarWithDropdown className="fixed top-0 left-0 w-full z-50 bg-white shadow-md" />  
           
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 px-6 pt-32">
        <div className="max-w-4xl pl-12">
          {/* Line + Text */}
          <div className="flex items-center space-x-3 mb-2">
            <span className="w-12 h-[1px] bg-white"></span>
            <p className="text-white text-sm font-medium tracking-wider uppercase">CONTACT US</p>
          </div>

          {/* Heading */} 
          <h1 className="text-white text-4xl md:text-5xl font-bold">Reach Out To Us</h1>    
        </div>   
      </div>           

      {/* Main Content */} 
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"> 
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Have Question? Let&apos;s Connect.</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-2xl">
            We&apos;d love to hear from you. Whether you&apos;re interested in our digital skills bootcamps, exploring online tech training in Nigeria, or looking to partner in building tech talent in Africa. Share your ideas, projects, or inquiries, and our team will get back to you promptly.
          </p>
        </div>


      </div>

      {/* Get in touch section  */}
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left side - Contact Information */}
          <div className="bg-blue-100 p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in touch</h2>

              <div className="space-y-6">
                <a href="mailto:skilluplimited@gmail.com">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 uppercase tracking-wide">EMAIL US</p>
                      <p className="text-gray-900 font-medium">skilluplimited@gmail.com</p>
                    </div>
                  </div>
                </a>


                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 uppercase tracking-wide">PHONE NUMBER</p>
                    <p className="text-gray-900 font-medium"> +2347040309594</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Dare Adeboye Innovation Hub, 2, Abiona road, Behind House of Favour, </p>
                    <p className="text-gray-900 font-medium">Redemption City, Mowe, Ogun State</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-700 font-medium mb-4">Connect with us:</p>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <Facebook className="w-5 h-5 text-gray-700" />
                </div>
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <Twitter className="w-5 h-5 text-gray-700" />
                </div>
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <Linkedin className="w-5 h-5 text-gray-700" />
                </div>
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <Instagram className="w-5 h-5 text-gray-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Brand/Company/Product Name"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full min-h-[120px] resize-none border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>




      {/* FAQ Section */}
    <Faq/>

      {/* Footer */}
    <Footer/>
    </div>
  )
}
