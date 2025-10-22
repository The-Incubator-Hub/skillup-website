import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";


export default function Footer() {
    return (
      <footer className="py-16" style={{ backgroundColor: "#DBEAFE" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="mb-6 flex items-center">
                <Image
                  src="/images/skillUp.png"
                  alt="REASTUR"
                  width={98}
                  height={20}
                  className="object-contain text-black"
                  style={{ fill: "black" }}
                />
              </div>

              <div className="flex gap-4">
                <Link href="" className="text-gray-600 hover:text-gray-900">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="https://www.instagram.com/theskillupglobal?igsh=YzljYTk1ODg3Zg==" className="text-gray-600 hover:text-gray-900">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="" className="text-gray-600 hover:text-gray-900">
                  <Youtube className="w-5 h-5" />
                </Link>
                <Link href="https://www.linkedin.com/company/theskillupglobal" className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Programs</h3>
              <div className="space-y-2">
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Digital Skills Bootcamp
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Data Science & Analytics
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Web & App Development
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Cybersecurity Essentials
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  UI/UX Design & Prototyping

                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Digital Marketing
                </Link>                
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
              <div className="space-y-2">
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Learn Tech in Africa
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Online Tech Training Nigeria
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Career Pathways
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Success Stories
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Partner With Us


                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Hire Tech Talent
                </Link>                                                
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <div className="space-y-2">
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Student Guides
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Best Practices in Tech Learning
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Alumni Network
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Events & Webinars
                </Link>                                
              </div> 
            </div>
          </div>
        </div>
      </footer>          
    )
}