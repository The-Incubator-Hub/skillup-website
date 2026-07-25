import { useMarquee } from '@/lib/animations';

const fallbackTestimonials = [
    {
        id: 'static-1',
        quote: "Before joining SkillUp Edtech, I had no clear path into tech. The program's hands-on projects and mentorship gave me the skills and confidence to land my first data analyst role in less than six months.",
        student_name: 'Caroline Moren',
        course_title: 'Data Analyst',
    },
    {
        id: 'static-2',
        quote: "I went from being a self-taught coder struggling to get noticed, to a full-time developer with a global client base. SkillUp Edtech's digital skills bootcamp isn't just training, it's a career launchpad.",
        student_name: 'Adebayo Kareem',
        course_title: 'Frontend Developer',
    },
    {
        id: 'static-3',
        quote: 'The online tech training gave me real-world projects to showcase my skills. The community support and career guidance were game-changers for me.',
        student_name: 'Chiamaka Eze',
        course_title: 'Product Designer',
    },
    {
        id: 'static-4',
        quote: "SkillUp Edtech connects you to the right people, tools, and opportunities. I didn't just learn, I became part of a pan-African network of innovators and tech leaders.",
        student_name: 'Samuel Otieno',
        course_title: 'Data Engineer',
    },
    {
        id: 'static-5',
        quote: 'I joined SkillUp Edtech to switch careers, and within weeks of completing the digital skills bootcamp, I landed my first digital marketing role.',
        student_name: 'Funke Ajayi',
        course_title: 'Digital Marketer',
    },
    {
        id: 'static-6',
        quote: "The projects I built during the training impressed my future employer. I now work remotely for a tech company in Europe, proving that African talent can compete globally.",
        student_name: 'Ahmed Musa',
        course_title: 'Full Stack Developer',
    },
];

export default function TestimonialsMarquee({ testimonials = [] }) {
    const items = testimonials.length > 0 ? testimonials : fallbackTestimonials;
    const rowOne = useMarquee({ duration: 46 });
    const rowTwo = useMarquee({ duration: 52, reverse: true });

    return (
        <section className="overflow-hidden bg-skillup-soft py-20" aria-label="Testimonials">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center" data-reveal>
                    <h2 className="mb-4 text-3xl font-bold text-skillup-navy md:text-4xl">What Our Alumni Are Saying</h2>
                    <p className="mx-auto max-w-2xl leading-relaxed text-gray-600">
                        From beginners with big dreams to professionals seeking a competitive edge, our graduates are living proof that Africa&apos;s digital future is here.
                    </p>
                </div>
            </div>

            <div className="overflow-hidden py-4">
                <div ref={rowOne} className="flex w-max gap-6 px-3">
                    {[...items, ...items].map((t, index) => (
                        <TestimonialCard key={`row1-${t.id}-${index}`} testimonial={t} />
                    ))}
                </div>
            </div>

            <div className="overflow-hidden py-4">
                <div ref={rowTwo} className="flex w-max gap-6 px-3">
                    {[...items, ...items].map((t, index) => (
                        <TestimonialCard key={`row2-${t.id}-${index}`} testimonial={t} compact />
                    ))}
                </div>
            </div>

            <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-blue-50 p-8 shadow-sm" data-reveal>
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
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
                                <Stat value={828} suffix="+" label="Learners Reached" />
                                <Stat value={3} label="Communities" />
                                <Stat value={5} label="Learning Tracks" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Stat({ value, suffix = '', label }) {
    return (
        <div className="text-center">
            <div
                className="mb-1 text-3xl font-bold tabular-nums text-skillup-navy md:text-4xl"
                data-count={value}
                data-count-suffix={suffix}
            >
                {value}
                {suffix}
            </div>
            <div className="text-sm text-gray-600">{label}</div>
        </div>
    );
}

function TestimonialCard({ testimonial, compact = false }) {
    const avatar = testimonial.avatar_path
        ? testimonial.avatar_path.startsWith('/')
            ? testimonial.avatar_path
            : `/storage/${testimonial.avatar_path}`
        : null;
    const initials = (testimonial.student_name || '?')
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <figure
            className={`flex-shrink-0 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
                compact ? 'w-[260px] md:w-[280px]' : 'w-[280px] md:w-[320px]'
            }`}
        >
            <blockquote className="mb-6 text-sm leading-relaxed text-gray-700">“{testimonial.quote}”</blockquote>
            <figcaption className="flex items-center gap-3">
                {avatar ? (
                    <img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800">
                        {initials}
                    </span>
                )}
                <div>
                    <p className="text-sm font-semibold text-gray-900">{testimonial.student_name}</p>
                    <p className="text-xs text-gray-500">{testimonial.course_title}</p>
                </div>
            </figcaption>
        </figure>
    );
}
