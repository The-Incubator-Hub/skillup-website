import { Card, CardContent } from "@/components/UI/card";
import FlipNumber from "@/components/UI/FlipNumber";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";

  const testimonials = [
    {
      id: 1,
      text: "Before joining SkillUp Edtech, I had no clear path into tech. The program's hands-on projects and mentorship gave me the skills and confidence to land my first data analyst role in less than six months. Learning tech in Africa has never felt this practical and empowering.",
      author: "Caroline Moren",
      role: "Data Analyst",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      text: "I went from being a self-taught coder struggling to get noticed, to a full-time developer with a global client base. SkillUp Edtech's digital skills bootcamp isn't just training, it's a career launchpad.",
      author: "Adebayo Kareem",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      text: "The online tech training in Nigeria gave me real-world projects to showcase my skills. The community support and career guidance were game-changers for me.",
      author: "Chiamaka Eze",
      role: "Product Designer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      text: "SkillUp Edtech connects you to the right people, tools, and opportunities. I didn't just learn, I became part of a pan-African network of innovators and tech leaders.",
      author: "Samuel Otieno",
      role: "Data Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      text: "I joined SkillUp Edtech to switch careers, and within weeks of completing the digital skills bootcamp, I landed my first digital marketing role. The blend of practical training and career support is unmatched in Africa.",
      author: "Funke Ajayi",
      role: "Digital Marketer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      text: "The projects I built during SkillUp Edtech's online tech training in Nigeria impressed my future employer. I now work remotely for a tech company in Europe, proving that African talent can compete globally.",
      author: "Ahmed Musa",
      role: "Full Stack Developer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      text: "SkillUp Edtech didn't just teach me data science, they gave me the portfolio, confidence, and connections to break into the industry. I'm proud to be part of a growing movement of tech talent in Africa.",
      author: "Linda Nwosu",
      role: "Data Scientist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      text: "I had the passion but no roadmap. With SkillUp Edtech, I gained in-demand cybersecurity skills, real job placement support, and a pan-African community that pushes me to grow every day.",
      author: "David Mensah",
      role: "Cybersecurity Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

export default function Testimonials() { 
    return (
      <section className="py-20 bg-[#EFF6FF]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#14183E] mb-4">
              What Our Alumnis Are Saying
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From beginners with big dreams to professionals seeking a competitive edge, our graduates are living proof that Africa&apos;s digital future is here.
            </p>
          </div>

          {/* Testimonials Layer 1 (Scroll Left) */}
          <div className="overflow-hidden py-8">
            <div className="flex gap-6 animate-scroll-left">
              {[...testimonials, ...testimonials].map((t, index) => (
                <Card
                  key={`layer1-${index}`}
                  className="bg-white border border-blue-400 border-b-0  hover:shadow-md transition-shadow flex-shrink-0 w-[280px] md:w-[300px]"
                >
                  <CardContent className="p-6">
                    <p className="text-gray-700 text-sm mb-6 leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={t.avatar || "/placeholder.svg"} alt={t.author} />
                        <AvatarFallback>CM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{t.author}</p>
                        <p className="text-gray-500 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials Layer 2 (Scroll Right) */}
          <div className="overflow-hidden py-8">
            <div className="flex gap-6 animate-scroll-right">
              {[...testimonials, ...testimonials].map((t, index) => (
                <Card
                  key={`layer2-${index}`}
                  className="bg-white border border-blue-400  border-b-0 hover:shadow-md transition-shadow flex-shrink-0 w-[260px] md:w-[280px]"
                >
                  <CardContent className="p-6">
                    <p className="text-gray-700 text-sm mb-6 leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={t.avatar || "/placeholder.svg"} alt={t.author} />
                        <AvatarFallback>CM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{t.author}</p>
                        <p className="text-gray-500 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-blue-50 rounded-lg p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-2">
                <p className="text-gray-700">
                  We provide <span className="font-bold text-gray-900">professional tutoring</span> that can help you
                </p>
                <p className="text-gray-700">
                  break into <span className="font-bold text-gray-900">tech</span> and make an impact in your industry
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="flex items-center gap-8 md:gap-12">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-[#14183E] mb-1">
                      <FlipNumber value={828} />
                    </div>
                    <div className="text-gray-600 text-sm">Learners Reached</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-[#14183E] mb-1">
                      <FlipNumber value={3} />
                    </div>
                    <div className="text-gray-600 text-sm">Communities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-[#14183E] mb-1">
                      <FlipNumber value={5} />
                    </div>
                    <div className="text-gray-600 text-sm">Learning Tracks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>              
    )
}
