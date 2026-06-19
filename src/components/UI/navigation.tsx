"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/UI/button"
import Image from "next/image"
import Link from "next/link"
import { APPLICATION_FORM_PATH } from "@/lib/forms"

interface NavbarWithDropdownProps {
  className?: string
}
export function NavbarWithDropdown({ className = "" }: NavbarWithDropdownProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Logo */}

          <Link
            href="/"
            aria-label="Go to SkillUp Global home"
            className="flex h-12 min-w-[128px] items-center transition-transform duration-200 hover:scale-105 md:min-w-[212px] lg:min-w-[236px]"
          >
            <Image
              src="/images/skillUp.png"
              alt="SkillUp Global Logo"
              width={118}
              height={28}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
            <Link href="/" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-700">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-700">
              About Us
            </Link>
            <Link href="/tech-trybe" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-700">
              Tech Trybe
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-700">
              Contact us
            </Link>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden min-w-[212px] items-center justify-end gap-3 md:flex lg:min-w-[236px]">
            <Button
              variant="outline"
              onClick={() =>
                alert("Coming Soon! We'll notify you when this program opens for enrollment.")
              }
              className="h-10 border-orange-500 bg-transparent px-5 text-sm text-orange-500 hover:bg-orange-50"
            >
              Login
            </Button>

            <Button asChild className="h-10 min-w-[116px] bg-blue-900 px-5 text-white hover:bg-blue-700">
              <Link href={APPLICATION_FORM_PATH}>Apply Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-[90vh] opacity-100 visible overflow-y-auto"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {/* Individuals */}
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <span>Home</span>
            </Link>

            {/* Corporates */}
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <span>About Us</span>
            </Link>


            {/* Company */}
            <Link
              href="/tech-trybe"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <span>Tech Trybe</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <span>Contact us</span>
            </Link>
          
            {/* Mobile Action Buttons */}
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() =>
                  alert("Coming Soon! We'll notify you when this program opens for enrollment.")
                }
                className="border-orange-500 text-orange-500 bg-transparent w-full 
                  hover:bg-orange-500 hover:text-white hover:scale-105 hover:shadow-lg
                  transition-all duration-300 ease-out"
              >
                Login
              </Button>

              <Button asChild className="w-full bg-blue-900 text-white hover:bg-blue-700">
                <Link href={APPLICATION_FORM_PATH} onClick={() => setIsMenuOpen(false)}>
                  Apply Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
