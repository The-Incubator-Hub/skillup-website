import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { ArrowLeft, ArrowRight, FileDown } from 'lucide-react';

export default function Show({ resource, relatedResources = [] }) {
    return (
        <PublicLayout>
            <Head title={`${resource.title} - SKILLUP Resources`} />

            <div className="border-b border-slate-200 bg-slate-50 py-4 pt-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link
                        href={route('resources.index')}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-skillup-blue"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Resources
                    </Link>
                </div>
            </div>

            <section className="bg-white py-16">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
                    <div>
                        <Badge className="bg-blue-50 text-skillup-blue ring-1 ring-blue-100">
                            {resource.category?.name}
                        </Badge>
                        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            {resource.title}
                        </h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                            {resource.description}
                        </p>

                        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white text-skillup-blue ring-1 ring-slate-200">
                                    <FileDown className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-900">Lead-gated resource download</h2>
                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        Submit your details and the file download will begin immediately.
                                    </p>
                                </div>
                            </div>

                            <form
                                action={route('resources.download', { slug: resource.slug })}
                                method="POST"
                                className="mt-6 grid gap-4 sm:grid-cols-2"
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''}
                                />

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-skillup-blue focus:ring-1 focus:ring-skillup-blue"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-skillup-blue focus:ring-1 focus:ring-skillup-blue"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-skillup-blue focus:ring-1 focus:ring-skillup-blue"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-skillup-blue px-5 py-3 text-sm font-semibold text-white hover:bg-skillup-blue/90 sm:w-auto"
                                    >
                                        <FileDown className="h-4 w-4" />
                                        Submit and Download
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div>
                        <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                            {resource.cover_image ? (
                                <img
                                    src={resource.cover_image}
                                    alt={resource.title}
                                    className="aspect-[4/3] w-full object-cover"
                                />
                            ) : (
                                <div className="flex aspect-[4/3] flex-col items-center justify-center text-slate-400">
                                    <FileDown className="h-16 w-16" />
                                    <span className="mt-2 text-xs font-semibold uppercase tracking-wide">Resource File</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {relatedResources.length > 0 && (
                <section className="border-t border-slate-200 bg-slate-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-slate-900">Related Resources</h2>
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedResources.map((item) => (
                                <Link
                                    key={item.id}
                                    href={route('resources.show', { slug: item.slug })}
                                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-skillup-blue"
                                >
                                    <div className="flex items-start gap-3">
                                        <FileDown className="mt-1 h-5 w-5 shrink-0 text-skillup-blue" />
                                        <div>
                                            <h3 className="font-bold text-slate-900">{item.title}</h3>
                                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                                                {item.description}
                                            </p>
                                            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-skillup-navy">
                                                View Details
                                                <ArrowRight className="h-3 w-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
