import { Head, Link } from '@inertiajs/react';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import PublicLayout from '@/Components/public/PublicLayout';
import { useRevealScope } from '@/lib/animations';

export default function Index({ programs = [] }) {
    const scope = useRevealScope();

    return (
        <PublicLayout>
            <Head title="Programs — SkillUp Edtech" />

            <div ref={scope}>
                <section className="bg-skillup-navy px-4 pb-16 pt-36 text-center">
                    <h1 className="text-4xl font-bold text-white sm:text-5xl" data-reveal>
                        SkillUp Programs
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100" data-reveal>
                        Seasonal, hands-on programmes for the next generation of African innovators.
                    </p>
                </section>

                <section className="bg-skillup-soft py-16">
                    <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8" data-reveal-group>
                        {programs.map((program) => (
                            <Link
                                key={program.slug}
                                href={`/programs/${program.slug}`}
                                className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <h2 className="text-2xl font-bold text-skillup-navy group-hover:text-skillup-blue">{program.name}</h2>
                                {program.tagline && <p className="mt-2 text-sm leading-6 text-gray-600">{program.tagline}</p>}

                                {program.currentEdition && (
                                    <div className="mt-5 space-y-2 text-sm text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-skillup-blue" aria-hidden="true" />
                                            {program.currentEdition.title}
                                        </p>
                                        {program.currentEdition.venueName && (
                                            <p className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-skillup-blue" aria-hidden="true" />
                                                {program.currentEdition.venueName}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-skillup-blue">
                                    View programme
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
