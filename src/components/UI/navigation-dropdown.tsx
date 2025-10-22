import { Button } from "@/components/UI/button"
import { GraduationCap, Wrench, Globe, Users, Building, Phone, MapPin, Mail, Award } from "lucide-react"
import Link from "next/link"


interface NavigationDropdownProps {
  type: "individuals" | "corporates" | "company"
}

export function NavigationDropdown({ type }: NavigationDropdownProps) {
  const getDropdownContent = () => {
    switch (type) {
      case "individuals":
        return {
          leftSections: [
            {
              title: "For You",
              links: ["All Programs", "Tech Bootcamps", "Self-Paced Learning", "Scholarships", "Success Stories"],
            },
            {
              title: "Resources",
              links: [
                "Download Course Catalog",
                "Free Career Switch Guide",
                "Tech Skills Roadmap (PDF)",
                "Help & Support",
              ],
            },
          ],
          rightSection: {
            title: "Why Learn With Us",
            features: [
              {
                icon: GraduationCap,
                title: "Promoting Digital Education",
                description: "Comprehensive learning programs",
              },
              {
                icon: Wrench,
                title: "Innovative Tech Workshops",
                description: "Hands-on workshops focused",
              },
              {
                icon: Globe,
                title: "Online Resource Hub",
                description: "A centralized platform offering",
              },
            ],
          },
          cta: {
            title: "Ready to start your tech journey",
            subtitle: "Join 2,000+ learners across Africa",
            buttonText: "Apply Now",
          },
        }

      case "corporates":
        return {
          leftSections: [
            {
              title: "Corporate Solutions",
              links: [
                "Team Training Programs",
                "Custom Bootcamps",
                "Skills Assessment",
                "Enterprise Learning",
                "Bulk Enrollment",
              ],
            },
            {
              title: "Resources",
              links: ["Corporate Brochure", "ROI Calculator", "Case Studies", "Training Calendar"],
            },
          ],
          rightSection: {
            title: "Why Choose Us",
            features: [
              {
                icon: Users,
                title: "Expert Team Training",
                description: "Upskill your entire workforce",
              },
              {
                icon: Award,
                title: "Proven Results",
                description: "95% completion rate for teams",
              },
              {
                icon: Building,
                title: "Enterprise Support",
                description: "Dedicated account management",
              },
            ],
          },
          cta: {
            title: "Transform your team's capabilities",
            subtitle: "Trusted by 100+ companies across Africa",
            buttonText: "Apply Now",
          },
        }

      case "company":
        return {
          leftSections: [
            {
              title: "About Us",
              links: ["Our Story", "Mission & Vision", "Leadership Team", "Careers", "Press & Media"],
            },
            {
              title: "Connect",
              links: ["Contact Us", "Partner With Us", "Become an Instructor", "Community"],
            },
          ],
          rightSection: {
            title: "Get In Touch",
            features: [
              {
                icon: MapPin,
                title: "Visit Our Office",
                description: "Lagos, Nigeria & Nairobi, Kenya",
              },
              {
                icon: Phone,
                title: "Call Us",
                description: "+234 123 456 7890",
              },
              {
                icon: Mail,
                title: "Email Us",
                description: "hello@skillup.africa",
              },
            ],
          },
          cta: {
            title: "Ready to join our mission?",
            subtitle: "Help us shape the future of tech education",
            buttonText: "Join Us",
          },
        }
    }
  }

  const content = getDropdownContent()

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t z-40">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left sections */}
          <div className="lg:col-span-8 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.leftSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right section */}
          <div className="lg:col-span-4 bg-blue-50 p-8">
            <h3 className="font-semibold text-gray-900 mb-6">{content.rightSection.title}</h3>
            <div className="space-y-6">
              {content.rightSection.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{content.cta.title}</h4>
              <p className="text-sm text-gray-600">{content.cta.subtitle}</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">{content.cta.buttonText}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
