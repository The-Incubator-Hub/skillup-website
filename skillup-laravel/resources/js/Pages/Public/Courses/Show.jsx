import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Layers, Wrench } from 'lucide-react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { buttonVariants } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { tracks as fallbackTracks } from '@/data/site';

export default function CourseShow({ trackSlug, track: databaseTrack = null }) {
    const track = databaseTrack || fallbackTracks.find((item) => item.slug === trackSlug) || fallbackTracks[0];
    const products = track.products || [];

    return (
        <PublicLayout>
            <Head title={track.title} />

            <section className="bg-skillup-navy pb-16 pt-32 text-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
                    <div>
                        <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100 hover:text-white">
                            <ArrowLeft className="h-4 w-4" />
                            Back to courses
                        </Link>
                        <div className="mt-6 flex flex-wrap gap-2">
                            <Badge className="bg-white/10 text-white ring-white/20">{track.category}</Badge>
                            <Badge className="bg-white/10 text-white ring-white/20">{track.level}</Badge>
                        </div>
                        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">{track.title}</h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">{track.summary}</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link href="/contact" className={buttonVariants({ size: 'lg' })}>
                                Ask about enrollment
                            </Link>
                            <Link href="/corporate" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
                                Corporate enquiry
                            </Link>
                        </div>
                    </div>
                    <img src={track.image} alt={track.title} className="h-full min-h-80 w-full rounded-lg object-cover shadow-2xl" />
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
                    <Info icon={Clock} title="Duration" value={track.duration} />
                    <Info icon={Layers} title="Levels" value={track.level} />
                    <Info icon={CheckCircle2} title="Price" value={track.price} />
                </div>
            </section>

            {products.length > 0 && (
                <section className="bg-white py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <Badge variant="neutral">Available products</Badge>
                            <h2 className="mt-4 text-3xl font-bold text-skillup-navy">Choose a course level</h2>
                        </div>
                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <Card key={product.slug}>
                                    <CardContent className="p-6">
                                        <Badge>{product.level}</Badge>
                                        <h3 className="mt-4 text-xl font-bold text-skillup-navy">{product.title}</h3>
                                        <p className="mt-3 text-sm leading-6 text-slate-600">{product.summary}</p>
                                        <div className="mt-5 flex items-center justify-between">
                                            <span className="font-bold text-skillup-blue">{product.price}</span>
                                            <Link href={product.url} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                                                View course
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-slate-50 py-20">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-skillup-navy">Expected outcomes</h2>
                            <div className="mt-5 space-y-3">
                                {track.outcomes.map((outcome) => (
                                    <div key={outcome} className="flex gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                                        <span className="text-slate-700">{outcome}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-skillup-navy">Tools and focus areas</h2>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {track.tools.map((tool) => (
                                    <span key={tool} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                                        <Wrench className="h-4 w-4 text-skillup-blue" />
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </PublicLayout>
    );
}

function Info({ icon: Icon, title, value }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Icon className="h-6 w-6 text-skillup-blue" />
            <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
            <p className="mt-2 text-xl font-bold text-skillup-navy">{value}</p>
        </div>
    );
}
