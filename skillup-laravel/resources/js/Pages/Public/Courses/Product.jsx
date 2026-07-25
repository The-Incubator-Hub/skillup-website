import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Clock, CreditCard, Layers, Users, Wrench } from 'lucide-react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { buttonVariants } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';

export default function ProductShow({ product }) {
    return (
        <PublicLayout>
            <Head title={product.title} />

            <section className="bg-skillup-navy pb-16 pt-32 text-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
                    <div>
                        <Link href={product.trackUrl} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100 hover:text-white">
                            <ArrowLeft className="h-4 w-4" />
                            Back to {product.trackTitle}
                        </Link>
                        <div className="mt-6 flex flex-wrap gap-2">
                            <Badge className="bg-white/10 text-white ring-white/20">{product.category}</Badge>
                            <Badge className="bg-white/10 text-white ring-white/20">{product.level}</Badge>
                            <Badge className="bg-white/10 text-white ring-white/20">{product.deliveryMode}</Badge>
                        </div>
                        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">{product.title}</h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">{product.description}</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link href={`/checkout/${product.slug}`} className={buttonVariants({ size: 'lg' })}>
                                Start enrollment
                            </Link>
                            <Link href="/corporate" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
                                Corporate seats
                            </Link>
                        </div>
                    </div>
                    <img src={product.image} alt={product.title} className="h-full min-h-80 w-full rounded-lg object-cover shadow-2xl" />
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
                    <Info icon={CreditCard} title="Price" value={product.price} />
                    <Info icon={Clock} title="Duration" value={product.duration} />
                    <Info icon={Layers} title="Level" value={product.level} />
                    <Info icon={Users} title="Seats" value={product.seats} />
                </div>
            </section>

            <section className="bg-slate-50 py-20">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-skillup-navy">Expected outcomes</h2>
                            <div className="mt-5 space-y-3">
                                {(product.outcomes || []).map((outcome) => (
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
                            <h2 className="text-2xl font-bold text-skillup-navy">Cohort</h2>
                            {product.cohort ? (
                                <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                                    <p className="font-semibold text-skillup-navy">{product.cohort.title}</p>
                                    <p>Starts: {product.cohort.startsAt || 'TBA'}</p>
                                    <p>Enrollment closes: {product.cohort.enrollmentClosesAt || 'TBA'}</p>
                                </div>
                            ) : (
                                <p className="mt-5 text-sm leading-6 text-slate-600">Cohort schedule will be published soon.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-skillup-navy">Syllabus</h2>
                            <div className="mt-5 space-y-4">
                                {(product.syllabus || []).map((item, index) => (
                                    <div key={`${item.week}-${item.title}`} className="rounded-md border border-slate-200 p-4">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Week {item.week || index + 1}</p>
                                        <p className="mt-1 font-semibold text-skillup-navy">{item.title}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-skillup-navy">Tools and payment options</h2>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {(product.tools || []).map((tool) => (
                                    <span key={tool} className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                                        <Wrench className="h-4 w-4 text-skillup-blue" />
                                        {tool}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-6 space-y-3">
                                {(product.paymentPlans || []).map((plan) => (
                                    <div key={plan.name} className="rounded-md border border-slate-200 p-4">
                                        <p className="font-semibold text-skillup-navy">{plan.name}</p>
                                        <p className="mt-1 text-sm text-slate-600">
                                            {plan.deposit} deposit, then {plan.installment} {plan.interval.toLowerCase()}.
                                        </p>
                                    </div>
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
