import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { ArrowRight, FileDown, X } from 'lucide-react';

export default function Index({ categories }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const openDownloadModal = (resource) => {
        setSelectedResource(resource);
        setModalOpen(true);
    };

    const closeDownloadModal = () => {
        setModalOpen(false);
        setSelectedResource(null);
        setFormData({ name: '', email: '', phone: '' });
    };

    return (
        <PublicLayout>
            <Head title="Resources Hub - Free eBooks & Guides - SKILLUP" />

            <section className="bg-skillup-navy pb-16 pt-32 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Badge className="bg-white/10 text-white ring-white/20">Resources Hub</Badge>
                    <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                        Free eBooks, Guides, and Tech Checklists to Accelerate Your Career.
                    </h1>
                </div>
            </section>

            {/* Resources List */}
            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {categories.length === 0 ? (
                        <div className="text-center py-12 rounded-lg border border-dashed border-slate-300 bg-white">
                            <p className="text-slate-500">No resources available at this time.</p>
                        </div>
                    ) : (
                        categories.map((category) => {
                            if (category.downloadables.length === 0) return null;

                            return (
                                <div key={category.id} className="mb-16 last:mb-0">
                                    <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-8">
                                        {category.name}
                                    </h2>

                                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                        {category.downloadables.map((resource) => (
                                            <div
                                                key={resource.id}
                                                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative overflow-hidden">
                                                    {resource.cover_image ? (
                                                        <img
                                                            src={resource.cover_image}
                                                            alt={resource.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex flex-col items-center text-slate-400">
                                                            <FileDown className="h-16 w-16" />
                                                            <span className="mt-2 text-xs font-semibold uppercase tracking-wider">PDF Resource</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute top-4 left-4">
                                                        <Badge className="bg-skillup-blue text-white">{category.name}</Badge>
                                                    </div>
                                                </div>

                                                <div className="flex flex-1 flex-col p-6">
                                                    <h3 className="text-lg font-bold text-slate-900">{resource.title}</h3>
                                                    <p className="mt-2 flex-1 text-sm text-slate-500 line-clamp-3">
                                                        {resource.description}
                                                    </p>

                                                    <div className="mt-6 grid gap-2">
                                                        <Link
                                                            href={route('resources.show', { slug: resource.slug })}
                                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-800 hover:border-skillup-blue hover:text-skillup-blue"
                                                        >
                                                            View Details
                                                            <ArrowRight className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => openDownloadModal(resource)}
                                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-skillup-navy py-3 text-sm font-semibold text-white hover:bg-skillup-navy/90"
                                                        >
                                                            <FileDown className="h-4 w-4" />
                                                            Download Resource
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>

            {/* Lead Capture Download Modal */}
            {modalOpen && selectedResource && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <button
                            onClick={closeDownloadModal}
                            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="text-center">
                            <FileDown className="mx-auto h-12 w-12 text-skillup-blue" />
                            <h3 className="mt-3 text-xl font-bold text-slate-900">Download Resource</h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Enter your details below to receive your download link for <span className="font-semibold text-slate-700">{selectedResource.title}</span>.
                            </p>
                        </div>

                        {/* Standard POST form submission to handle file download payload */}
                        <form
                            action={route('resources.download', { slug: selectedResource.slug })}
                            method="POST"
                            onSubmit={() => setTimeout(closeDownloadModal, 1500)}
                            className="mt-6 space-y-4"
                        >
                            {/* CSRF Token */}
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
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Jane Doe"
                                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-skillup-blue focus:ring-1 focus:ring-skillup-blue outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="jane@example.com"
                                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-skillup-blue focus:ring-1 focus:ring-skillup-blue outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700">Phone Number (Optional)</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+234 80 1234 5678"
                                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-skillup-blue focus:ring-1 focus:ring-skillup-blue outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-skillup-blue py-3 text-sm font-semibold text-white hover:bg-skillup-blue/90"
                            >
                                <FileDown className="h-4 w-4" />
                                Submit & Download
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
