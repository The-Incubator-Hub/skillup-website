import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowRight, Briefcase, Search, Users } from 'lucide-react';
import PublicLayout from '@/Components/public/PublicLayout';
import CoursesPrograms from '@/Components/public/CoursesPrograms';
import FaqAccordion from '@/Components/public/FaqAccordion';
import TestimonialsMarquee from '@/Components/public/TestimonialsMarquee';
import { useHeroIntro, useMarquee, useRevealScope, useWordRotate } from '@/lib/animations';
import { faqs as staticFaqs, partnerLogos as staticPartners } from '@/data/site';

const heroWords = ['Career Path', 'Employability', 'Talent'];

const staticPosts = [
    {
        id: 'static-1',
        title: 'How to Stay Consistent with Learning (Even on Busy Days)',
        summary:
            'Life gets busy but your learning goals don’t have to suffer. Discover practical methods for balancing work, study, and personal life while thriving in your tech training journey.',
        featured_image: '/images/consistent.jpg',
        href: '/blog',
    },
    {
        id: 'static-2',
        title: 'How to Choose the Right Course for Your Career Goals',
        summary:
            'Picking the right course shouldn’t feel like guesswork. Learn how to align your studies with your career ambitions and choose programs that open doors in Africa’s growing tech industry.',
        featured_image: '/images/right_course.jpg',
        href: '/blog',
    },
    {
        id: 'static-3',
        title: 'Mastering Remote Work as a Tech Professional in Africa',
        summary:
            'Remote work is now the norm in tech. Learn how African tech talent can build productive routines, collaborate across time zones, and thrive in global teams.',
        featured_image: '/images/remote.jpg',
        href: '/blog',
    },
    {
        id: 'static-4',
        title: 'From Beginner to Pro: Your Roadmap to Learning Tech in Africa',
        summary:
            'Breaking into tech can feel overwhelming — but it doesn’t have to be. A step-by-step guide to choosing a career path, building your portfolio, and landing your first job.',
        featured_image: '/images/beginners.jpg',
        href: '/blog',
    },
];

export default function Home({ faqs = [], testimonials = [], partners = [], recentPosts = [] }) {
    const scope = useRevealScope();
    const heroScope = useHeroIntro();
    const wordRef = useWordRotate(heroWords);
    const logoTrack = useMarquee({ duration: 30 });

    const [searchQuery, setSearchQuery] = useState('');
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSuccess, setNewsletterSuccess] = useState(null);
    const [newsletterError, setNewsletterError] = useState(null);
    const [newsletterLoading, setNewsletterLoading] = useState(false);

    const activeFaqs = faqs.length > 0 ? faqs : staticFaqs;
    const activePartners = partners.length > 0
        ? partners.map((p) => ({ src: p.logo_path.startsWith('/') ? p.logo_path : `/storage/${p.logo_path}`, alt: p.name }))
        : staticPartners;
    const activePosts = recentPosts.length > 0 ? recentPosts : staticPosts;

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/courses', searchQuery ? { search: searchQuery } : {});
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setNewsletterLoading(true);
        setNewsletterSuccess(null);
        setNewsletterError(null);

        try {
            const response = await fetch(route('leads.newsletter'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ email: newsletterEmail }),
            });

            const data = await response.json();
            if (response.ok) {
                setNewsletterSuccess(data.message);
                setNewsletterEmail('');
            } else {
                setNewsletterError(data.message || 'Something went wrong.');
            }
        } catch (error) {
            setNewsletterError('Failed to subscribe. Please try again.');
        } finally {
            setNewsletterLoading(false);
        }
    };

    return (
        <PublicLayout>
            <Head title="SkillUp Edtech - Learning Simplified" />

            <div ref={scope}>
                {/* Hero */}
                <section
                    ref={heroScope}
                    className="relative flex min-h-svh items-center justify-center overflow-hidden bg-skillup-navy"
                >
                    <img
                        src="/images/hero.jpg"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

                    <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-28 text-center">
                        <h1
                            data-hero
                            className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl lg:text-7xl"
                        >
                            Up your skills to advance your{' '}
                            <span className="relative inline-block text-blue-400">
                                <span ref={wordRef} className="inline-block whitespace-nowrap">
                                    {heroWords[0]}
                                </span>
                                <span
                                    className="absolute -bottom-1 left-0 right-0 h-1 motion-safe:animate-pulse rounded-full bg-blue-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </h1>

                        <p data-hero className="mx-auto mb-8 max-w-2xl text-base text-gray-200 sm:mb-12 sm:text-lg md:text-xl">
                            Upskill yourself to thrive in Africa&apos;s digital future today.
                        </p>

                        <form data-hero onSubmit={handleSearch} className="relative mx-auto max-w-2xl" role="search">
                            <label htmlFor="hero-search" className="sr-only">
                                What do you want to learn?
                            </label>
                            <input
                                id="hero-search"
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="What do you want to learn?"
                                className="h-12 w-full rounded-full border-0 bg-white/95 pl-6 pr-16 text-base text-slate-900 shadow-lg backdrop-blur-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-skillup-blue sm:h-14 sm:text-lg"
                            />
                            <button
                                type="submit"
                                aria-label="Search courses"
                                className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-12 sm:w-12"
                            >
                                <Search className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                            </button>
                        </form>
                    </div>
                </section>

                {/* Organizations marquee */}
                <section className="overflow-hidden bg-white py-8 sm:py-12 md:py-16" aria-label="Partner organizations">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2
                            data-reveal
                            className="mb-8 text-center text-2xl font-normal leading-tight text-skillup-navy sm:mb-12 sm:text-3xl md:mb-16 md:text-4xl"
                        >
                            Organizations we&apos;ve worked with
                        </h2>
                    </div>
                    <div className="overflow-hidden">
                        <div ref={logoTrack} className="flex w-max items-center">
                            {[...activePartners, ...activePartners].map((logo, index) => (
                                <div key={`${logo.alt}-${index}`} className="mx-8 flex h-16 w-32 flex-shrink-0 items-center justify-center sm:mx-12">
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="max-h-full max-w-full object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose SkillUp */}
                <section className="bg-white py-12 sm:py-16 md:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
                            <div className="relative order-2 lg:order-1" data-reveal>
                                <div className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[480px] lg:w-[480px]">
                                    <div className="relative mx-auto h-full w-full overflow-hidden rounded-full border border-skillup-blue">
                                        <div className="absolute left-4 top-4 h-full w-full rounded-full bg-skillup-blue sm:left-5 sm:top-5 md:left-6 md:top-6" />
                                        <img
                                            src="/images/skill_up.png"
                                            alt="SkillUp learner giving a thumbs up"
                                            className="absolute left-12 top-16 h-56 w-48 rounded-full object-cover sm:left-16 sm:top-20 sm:h-64 sm:w-56 md:left-20 md:top-24 md:h-72 md:w-64 lg:left-[64px] lg:top-[80px] lg:h-[400px] lg:w-[352px]"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="absolute left-2 top-2 hidden h-8 w-8 rounded-full bg-skillup-blue sm:block md:h-10 md:w-10" aria-hidden="true" />
                                    <div className="absolute right-2 top-6 hidden h-8 w-8 rounded-full bg-skillup-blue sm:block md:right-4 md:h-10 md:w-10" aria-hidden="true" />
                                    <div className="absolute bottom-12 left-6 hidden h-8 w-8 rounded-full bg-skillup-blue sm:block md:h-10 md:w-10" aria-hidden="true" />
                                </div>
                            </div>

                            <div className="order-1 lg:order-2">
                                <h2 data-reveal className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:mb-6 md:text-4xl">
                                    Why Choose SkillUp Edtech?
                                </h2>
                                <p data-reveal className="mb-6 text-base text-gray-600 sm:text-lg md:mb-8">
                                    Our programs are designed to help you gain in-demand digital skills, connect with real job opportunities, and thrive in the global digital economy.
                                </p>

                                <div className="space-y-4 md:space-y-6" data-reveal-group>
                                    <div className="group cursor-pointer rounded-lg bg-[#F0F3FF] p-4 transition-all duration-300 hover:bg-[#E6EDFF] md:p-6">
                                        <div className="flex items-start gap-3 md:gap-4">
                                            <img
                                                src="/images/flight.jpg"
                                                alt=""
                                                className="h-10 w-10 flex-shrink-0 rounded-lg transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12"
                                                loading="lazy"
                                            />
                                            <div>
                                                <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">Industry-Relevant Training</h3>
                                                <p className="text-sm text-gray-600 md:text-base">
                                                    Learn from experts with hands-on experience in top industries, giving you the skills global and African employers actually want.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Feature
                                        icon={Users}
                                        iconClass="bg-red-100 text-red-600"
                                        title="Career-Focused Support"
                                        text="From CV makeovers to interview prep, we provide personalised support to help you secure roles in tech locally and globally."
                                    />
                                    <Feature
                                        icon={Briefcase}
                                        iconClass="bg-green-100 text-green-600"
                                        title="Pan-African Network"
                                        text="Join a vibrant community of learners, mentors, and employers across Africa, creating opportunities to grow your career and make an impact."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Courses & Programs tabs */}
                <CoursesPrograms />

                {/* What Sets Us Apart bento */}
                <section className="bg-white px-4 py-16">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center" data-reveal>
                            <h2 className="mb-4 text-3xl font-bold text-skillup-navy sm:text-4xl">What Sets Us Apart</h2>
                            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
                                At SkillUp Edtech, we are redefining how Africans learn, work, and thrive in the digital age.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
                            <div className="flex flex-col gap-6">
                                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                    <img src="/images/Facilitators.jpg" alt="Two professionals collaborating at a desk" className="h-64 w-full object-cover" loading="lazy" />
                                </div>
                                <BentoCard
                                    title="Expert Facilitators"
                                    text="Our trainers aren't just teachers — they're industry veterans who've built products, led teams, and solved real business challenges across Africa and beyond. They bring hands-on knowledge, mentorship, and insider insights."
                                />
                            </div>

                            <div className="flex flex-col gap-6 rounded-2xl bg-blue-200 p-8">
                                <img src="/images/abj.png" alt="Illustration of the SkillUp community" className="h-64 w-full object-cover" loading="lazy" />
                                <BentoCard
                                    bare
                                    title="Vast Online Community"
                                    text="Learning doesn't stop at the classroom. Join a pan-African network of thousands of learners, alumni, and employers collaborating, sharing opportunities, and building solutions for the continent."
                                />
                            </div>

                            <div className="flex flex-col gap-6">
                                <BentoCard
                                    title="Focused Learning Tracks"
                                    text="From software development to data analytics, product design, project management, and AI — our learning tracks are designed to take you from beginner to hire-ready with tools to compete on a global stage."
                                />
                                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                    <img src="/images/whygood.jpg" alt="Library with curved bookshelves" className="h-64 w-full object-cover" loading="lazy" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <TestimonialsMarquee testimonials={testimonials} />

                {/* FAQ */}
                <section className="bg-white py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center" data-reveal>
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
                            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
                                Find quick answers about our digital skills bootcamp, tech training, and how we empower tech talent in Africa.
                            </p>
                        </div>
                        <div className="mx-auto max-w-4xl" data-reveal>
                            <FaqAccordion items={activeFaqs} />
                        </div>
                    </div>
                </section>

                {/* Blog */}
                <section className="bg-skillup-soft py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Read. Learn. Grow</h2>
                                <p className="max-w-2xl text-base text-gray-600 sm:text-lg">
                                    Explore expert tips, inspiring stories, and practical strategies to help you succeed in the fast-paced world of technology.
                                </p>
                            </div>
                            <Link
                                href="/blog"
                                className="inline-flex h-11 flex-shrink-0 items-center justify-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                            >
                                Read More Blogs
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2" data-reveal-group>
                            {activePosts.slice(0, 4).map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="px-4 py-12">
                    <div className="relative mx-auto flex w-full max-w-[1296px] flex-col items-center justify-center gap-8 overflow-hidden rounded-2xl bg-skillup-deep px-6 py-16">
                        <img
                            src="/images/Shape.png"
                            alt=""
                            className="pointer-events-none absolute bottom-0 right-0 h-auto max-h-full w-auto max-w-full opacity-80"
                            aria-hidden="true"
                            loading="lazy"
                        />

                        <h2 data-reveal className="z-10 text-center text-3xl font-bold text-white sm:text-[40px]">
                            Stay Updated with us
                        </h2>
                        <p data-reveal className="z-10 max-w-[725px] text-center font-montserrat text-base leading-[150%] text-[#F4F4F4] sm:text-lg">
                            Join our learning community and never miss out on the latest opportunities, tips, and success stories shaping the future of tech talent in Africa.
                        </p>

                        <form onSubmit={handleSubscribe} className="z-10 flex w-full max-w-md flex-col gap-3 sm:flex-row" data-reveal>
                            <label htmlFor="newsletter-email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="newsletter-email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="Enter your email"
                                disabled={newsletterLoading}
                                className="h-12 min-w-0 flex-auto rounded-md border-0 bg-white/10 px-4 text-white shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            />
                            <button
                                type="submit"
                                disabled={newsletterLoading}
                                className="inline-flex h-12 flex-none items-center justify-center rounded-md bg-white px-8 text-base font-semibold text-blue-900 shadow-sm transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:bg-slate-200 disabled:text-slate-400"
                            >
                                {newsletterLoading ? 'Subscribing…' : 'Subscribe'}
                            </button>
                        </form>
                        <div className="z-10 min-h-6 text-center" role="status" aria-live="polite">
                            {newsletterSuccess && <p className="text-sm font-medium text-green-200">{newsletterSuccess}</p>}
                            {newsletterError && <p className="text-sm font-medium text-red-200">{newsletterError}</p>}
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}

function Feature({ icon: Icon, iconClass, title, text }) {
    return (
        <div className="flex items-start gap-3 md:gap-4">
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg md:h-12 md:w-12 ${iconClass}`}>
                <Icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
            </div>
            <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">{title}</h3>
                <p className="text-sm text-gray-600 md:text-base">{text}</p>
            </div>
        </div>
    );
}

function BentoCard({ title, text, bare = false }) {
    const inner = (
        <>
            <h3 className="mb-4 text-xl font-bold text-[#1E1E1E]">{title}</h3>
            <p className="font-montserrat leading-relaxed text-[#5B5B5B]">{text}</p>
        </>
    );

    if (bare) {
        return <div>{inner}</div>;
    }

    return <div className="flex flex-1 flex-col justify-center rounded-2xl bg-blue-200 p-8">{inner}</div>;
}

function BlogCard({ post }) {
    const href = post.slug ? `/blog/${post.slug}` : post.href || '/blog';

    return (
        <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
            <img
                src={post.featured_image || '/images/consistent.jpg'}
                alt=""
                className="h-64 w-full object-cover"
                loading="lazy"
            />
            <div className="p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    <Link href={href} className="transition-colors hover:text-skillup-blue">
                        {post.title}
                    </Link>
                </h3>
                <p className="mb-4 text-sm leading-6 text-gray-600">{post.summary}</p>
                <Link href={href} className="font-medium text-blue-700 transition-colors hover:text-blue-900">
                    Read post »
                </Link>
            </div>
        </article>
    );
}
