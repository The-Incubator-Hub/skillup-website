import { Head, Link } from '@inertiajs/react';
import { MessageSquare, ShieldCheck, Users } from 'lucide-react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { buttonVariants } from '@/Components/ui/button';

export default function Community() {
    return (
        <PublicLayout>
            <Head title="Community" />

            <section className="bg-skillup-navy pb-16 pt-32 text-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div>
                        <Badge className="bg-white/10 text-white ring-white/20">Discourse community</Badge>
                        <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">A community layer for cohorts, peer support, and alumni momentum.</h1>
                        <p className="mt-5 text-lg leading-8 text-blue-50">
                            The platform plan uses Discourse for discussions, cohort groups, announcements, and community support through SSO from SKILLUP.
                        </p>
                        <div className="mt-8">
                            <Link href="/contact" className={buttonVariants({ size: 'lg' })}>
                                Ask about community access
                            </Link>
                        </div>
                    </div>
                    <img src="/images/abj.png" alt="SkillUp community" className="h-full min-h-80 w-full rounded-lg object-cover shadow-2xl" />
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
                    <Point icon={Users} title="Cohort groups" text="Learners can be mapped into relevant Discourse groups and categories after enrollment." />
                    <Point icon={MessageSquare} title="Peer discussions" text="Course support, questions, announcements, and alumni conversations can live outside Moodle lessons." />
                    <Point icon={ShieldCheck} title="SSO-controlled access" text="SKILLUP should control who enters community spaces based on account and enrollment status." />
                </div>
            </section>
        </PublicLayout>
    );
}

function Point({ icon: Icon, title, text }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Icon className="h-7 w-7 text-skillup-blue" />
            <h2 className="mt-4 text-xl font-bold text-skillup-navy">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
        </div>
    );
}
