import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Bookmark, Clock, ExternalLink } from 'lucide-react';
import { programs, tracks } from '@/data/site';
import { cn } from '@/lib/utils';

const programDetails = {
    'SkillUp Plus': {
        projects: 'LMS learning + live sync sessions + capstone project',
        waitlistCount: 828,
        href: '/courses',
        cta: 'Apply Now',
    },
    'Tech Trybe Bootcamp': {
        projects: 'Practical, mentor-led sessions + project-based learning',
        waitlistCount: 32,
        href: '/community',
        cta: 'Join Waitlist',
    },
};

export default function CoursesPrograms() {
    const [activeTab, setActiveTab] = useState('programs');

    return (
        <section className="bg-blue-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-reveal>
                    <h2 className="text-2xl font-bold leading-[120%] text-skillup-navy md:text-3xl lg:text-[40px]">
                        {activeTab === 'courses' ? 'Courses We Offer.' : 'Interested In Our Programs?'}
                    </h2>

                    <div
                        className="mx-auto flex h-[72px] w-full max-w-[320px] items-center gap-1 rounded-md bg-skillup-light p-2 lg:mx-0"
                        role="tablist"
                        aria-label="Courses or programs"
                    >
                        <TabButton active={activeTab === 'programs'} onClick={() => setActiveTab('programs')}>
                            Programs
                        </TabButton>
                        <TabButton active={activeTab === 'courses'} onClick={() => setActiveTab('courses')}>
                            Courses
                        </TabButton>
                    </div>
                </div>

                {activeTab === 'courses' ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
                        {tracks.slice(0, 6).map((track) => (
                            <CourseCard key={track.slug} track={track} />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2" data-reveal-group>
                        {programs.map((program) => (
                            <ProgramCard key={program.title} program={program} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function TabButton({ active, onClick, children }) {
    return (
        <button
            type="button"
            role="tab"
            aria-selected={active}
            onClick={onClick}
            className={cn(
                'h-[56px] flex-1 rounded-md px-4 text-center text-base font-medium leading-6 transition-colors lg:text-xl',
                active ? 'bg-blue-800 text-white shadow-sm' : 'text-blue-900 hover:bg-blue-100',
            )}
        >
            {children}
        </button>
    );
}

function CourseCard({ track }) {
    const comingSoon = track.category === 'Phase 2 track';

    return (
        <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative">
                <img src={track.image} alt={track.title} className="h-48 w-full object-cover" loading="lazy" />
                {comingSoon && (
                    <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-zinc-600 shadow-md">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        Coming Soon
                    </span>
                )}
                <Link
                    href={`/courses/${track.slug}`}
                    aria-label={`Open ${track.title}`}
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-gray-900 shadow-md transition-colors hover:bg-gray-100"
                >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Link>
            </div>
            <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-skillup-ink lg:text-2xl">{track.title}</h3>
                <p className="mb-4 text-sm leading-6 text-skillup-muted">{track.summary}</p>
                <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <MetaPill icon={Bookmark}>{track.level}</MetaPill>
                    <MetaPill icon={Clock}>{track.duration}</MetaPill>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-bold text-blue-900">{track.price}</span>
                    <Link
                        href={`/courses/${track.slug}`}
                        className="rounded-md border-2 border-skillup-blue bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all hover:bg-blue-900 hover:text-white"
                    >
                        {comingSoon ? 'Join Waitlist' : 'Enroll now'}
                    </Link>
                </div>
            </div>
        </article>
    );
}

function ProgramCard({ program }) {
    const details = programDetails[program.title] || { projects: program.description, waitlistCount: 0, href: '/courses', cta: 'Apply Now' };

    return (
        <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img src={program.image} alt={program.title} className="h-72 w-full object-cover" loading="lazy" />
            <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-blue-900 lg:text-2xl">{program.title}</h3>
                <p className="mb-4 text-sm leading-6 text-skillup-muted">{program.description}</p>
                <div className="mb-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <MetaPill icon={Bookmark}>{details.projects}</MetaPill>
                    <MetaPill icon={Clock}>{program.duration}</MetaPill>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                        <div className="flex -space-x-2">
                            {[0, 1, 2].map((i) => (
                                <img
                                    key={i}
                                    src="/images/pic.png"
                                    alt=""
                                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                                    loading="lazy"
                                />
                            ))}
                        </div>
                        <span className="ml-3 text-sm text-gray-700">{details.waitlistCount} learners impacted</span>
                    </div>
                    <Link
                        href={details.href}
                        className="rounded-md border-2 border-skillup-blue bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all hover:bg-blue-900 hover:text-white"
                    >
                        {details.cta}
                    </Link>
                </div>
            </div>
        </article>
    );
}

function MetaPill({ icon: Icon, children }) {
    return (
        <span className="flex min-h-10 items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-zinc-600">
            <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            {children}
        </span>
    );
}
