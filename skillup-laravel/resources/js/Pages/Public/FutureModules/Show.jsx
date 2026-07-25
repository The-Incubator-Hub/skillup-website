import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Show({ module }) {
    return (
        <PublicLayout>
            <Head title={`${module.name} - SKILLUP`} />

            <section className="bg-skillup-navy pb-16 pt-32 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Badge className="bg-white/10 text-white ring-white/20">
                        {module.moduleGroup}
                    </Badge>
                    <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                        {module.name}
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">
                        {module.summary}
                    </p>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Launch Readiness</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            This module is feature-gated so SKILLUP can expand it only after the academy core remains stable in production.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-skillup-blue px-5 py-3 text-sm font-semibold text-white hover:bg-skillup-blue/90"
                        >
                            Contact SKILLUP
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                        <h3 className="font-bold text-slate-900">Readiness checks</h3>
                        <div className="mt-5 space-y-4">
                            {(module.readinessChecks || []).map((item) => (
                                <div key={item} className="flex gap-3">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-skillup-blue" />
                                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
