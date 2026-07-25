import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Filter, Search } from 'lucide-react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { buttonVariants } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { tracks as fallbackTracks } from '@/data/site';

export default function CoursesIndex({ products = [] }) {
    const catalogue = products.length > 0 ? products : fallbackTracks.map((track) => ({
        ...track,
        trackSlug: track.slug,
        trackTitle: track.title,
        url: `/courses/${track.slug}`,
    }));

    return (
        <PublicLayout>
            <Head title="Courses" />

            <section className="bg-skillup-navy pb-16 pt-32 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Badge className="bg-white/10 text-white ring-white/20">Course catalogue</Badge>
                    <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                        Explore practical tech courses by track, level, and price.
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">
                        Choose a SKILLUP course, review the cohort details, and move into enrollment when checkout is enabled.
                    </p>
                </div>
            </section>

            <section className="bg-white py-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:px-6 md:flex-row lg:px-8">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input className="pl-10" placeholder="Search tracks, skills, tools, or levels" />
                    </div>
                    <button type="button" className={buttonVariants({ variant: 'secondary' })}>
                        <Filter className="h-4 w-4" />
                        Filters
                    </button>
                </div>
            </section>

            <section className="bg-slate-50 py-16">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                    {catalogue.map((product) => (
                        <Card key={`${product.trackSlug}-${product.slug}`} className="overflow-hidden">
                            <img src={product.image} alt={product.title} className="h-52 w-full object-cover" />
                            <CardContent className="p-6">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant={product.category === 'Launch track' ? 'default' : 'warning'}>{product.category}</Badge>
                                    <Badge variant="neutral">{product.level}</Badge>
                                </div>
                                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">{product.trackTitle}</p>
                                <h2 className="mt-1 text-2xl font-bold text-skillup-navy">{product.title}</h2>
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
            </section>
        </PublicLayout>
    );
}
