import { Head } from '@inertiajs/react';
import { FileText, Lightbulb, Monitor, Users } from 'lucide-react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';

const milestones = [
    {
        title: 'SkillUp Warri',
        learners: '384',
        courses: '4',
        text: 'A flagship South-South initiative with hands-on digital skills and entrepreneurship training.',
    },
    {
        title: 'SkillUp Port Harcourt',
        learners: '117',
        courses: '4',
        text: 'An intensive learning activation for aspiring tech professionals and entrepreneurs in Rivers State.',
    },
    {
        title: 'SkillUp Redemption Camp',
        learners: '327',
        courses: '4',
        text: 'A practical program hosted at RECTEM Lecture Halls with mentors, resources, and industry exposure.',
    },
];

export default function About() {
    return (
        <PublicLayout>
            <Head title="About SKILLUP" />

            <section className="bg-skillup-navy pb-16 pt-32 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Badge className="bg-white/10 text-white ring-white/20">About us</Badge>
                    <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                        Discover how SKILLUP improves lives through technology and skills.
                    </h1>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div>
                        <h2 className="text-3xl font-bold text-skillup-navy sm:text-4xl">First choice for tech education anywhere.</h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            Whether learners are starting fresh or advancing their careers, SKILLUP combines expert-led training, hands-on projects, and career support to shape practical tech talent in Africa.
                        </p>
                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            <Stat value="828+" label="Learners reached" />
                            <Stat value="3" label="Communities activated" />
                            <Stat value="4+" label="Years of impact" />
                        </div>
                    </div>
                    <img src="/images/Facilitators.jpg" alt="Students collaborating on technology projects" className="h-full min-h-96 w-full rounded-lg object-cover shadow-xl" />
                </div>
            </section>

            <section className="bg-slate-50 py-20">
                <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div>
                        <Badge>Why learn with us</Badge>
                        <h2 className="mt-4 text-3xl font-bold text-skillup-navy">Practical training, community, and a real platform path.</h2>
                        <div className="mt-8 space-y-5">
                            <Reason icon={Monitor} title="Promoting digital education" text="Programs build foundational and advanced tech skills for the modern workplace." />
                            <Reason icon={Lightbulb} title="Innovative workshops" text="Learners apply concepts through practical work, live sessions, and emerging technology exposure." />
                            <Reason icon={FileText} title="Online resource hub" text="The platform direction includes resources, templates, insights, support, and learner guidance." />
                            <Reason icon={Users} title="Pan-African network" text="Community and cohort support keep learners connected beyond individual course lessons." />
                        </div>
                    </div>
                    <img src="/images/skill_up.png" alt="Happy SKILLUP learner" className="h-full max-h-[620px] w-full rounded-lg object-cover shadow-xl" />
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Badge>Past activations</Badge>
                    <h2 className="mt-4 text-3xl font-bold text-skillup-navy sm:text-4xl">From local activations to one integrated academy platform.</h2>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {milestones.map((item) => (
                            <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-skillup-navy">{item.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <Stat value={item.learners} label="Learners" />
                                    <Stat value={item.courses} label="Courses" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

function Reason({ icon: Icon, title, text }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-blue-50 text-skillup-blue">
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                </div>
            </div>
        </div>
    );
}

function Stat({ value, label }) {
    return (
        <div className="rounded-md bg-blue-50 p-4 text-center">
            <div className="text-2xl font-bold text-skillup-blue">{value}</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
        </div>
    );
}
