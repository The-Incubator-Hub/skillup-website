import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/accordion";


export default function Faq(){

    return(
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers about our digital skills bootcamp, tech training, and how we empower tech talent in Africa.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-blue-50 border border-blue-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What kind of courses are available on this platform?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  We offer a range of expert-led courses in tech, business, creative skills, and personal development tailored for learners at every level. From coding bootcamps to UI/UX design, data science, cybersecurity, and digital marketing, our programs are designed to grow tech talent in Africa and provide world-class online tech training in Nigeria.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-gray-50 border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Do I get a certificate after completing a course?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Yes! Every learner who successfully completes a course receives an industry-recognized certificate. This helps you showcase your skills to employers and stand out in Africa&apos;s competitive digital job market.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-gray-50 border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Can I learn at my own pace?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Absolutely. We provide flexible learning options so you can study at a pace that fits your schedule whether you&apos;re a full-time student, working professional, or career changer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-gray-50 border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  We accept payments via debit/credit cards, bank transfers, and popular mobile payment platforms across Africa. For some programs, installment plans are available to make our digital skills bootcamp even more accessible.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-gray-50 border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Will I have access to the course after I complete it?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Yes. Once enrolled, you get lifetime access to your course materials, including updates and new resources, so you can revisit and refresh your skills anytime.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-gray-50 border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Are the courses mobile-friendly?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Yes. Our learning platform is fully mobile-optimized, allowing you to access lessons, videos, and assignments on your phone, tablet, or laptop—perfect for learners on the go.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-gray-50 border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Can I get a refund if I don&apos;t like a course?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  We offer a satisfaction guarantee. If you&apos;re not happy with your course, you can request a refund within the first 7 days of enrollment, subject to our refund policy.

                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

    )
}