import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { BarChart3, FileText, UsersRound, Send } from 'lucide-react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { buttonVariants } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';

export default function Corporate() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        company_name: '',
        employee_count: '<50',
        message: ''
    });
    const [status, setStatus] = useState('idle');

    const update = (event) => {
        setForm((current) => ({
            ...current,
            [event.target.name]: event.target.value,
        }));
    };

    const submit = async (event) => {
        event.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch(route('leads.corporate'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();
            if (response.ok) {
                setStatus('success');
                setForm({
                    name: '',
                    email: '',
                    company_name: '',
                    employee_count: '<50',
                    message: ''
                });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <PublicLayout>
            <Head title="Corporate Training - SKILLUP" />

            <section className="bg-skillup-navy pb-16 pt-32 text-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div>
                        <Badge className="bg-white/10 text-white ring-white/20">Corporate training</Badge>
                        <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">Enroll teams, manage seats, and track learning outcomes.</h1>
                        <p className="mt-5 text-lg leading-8 text-blue-50">
                            Corporate workflows support quote requests, invoices, team uploads, seat allocation, enrollment status, and progress reporting.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a href="#inquiry-form" className={buttonVariants({ size: 'lg' })}>
                                Request a quote
                            </a>
                            <Link href="/courses" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
                                View tracks
                            </Link>
                        </div>
                    </div>
                    <img src="/images/Facilitators.jpg" alt="Corporate learners collaborating" className="h-full min-h-80 w-full rounded-lg object-cover shadow-2xl" />
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
                    <Point icon={UsersRound} title="Team onboarding" text="Invite learners manually or through bulk upload once the corporate panel is implemented." />
                    <Point icon={FileText} title="Invoices and payments" text="Support corporate quotes, invoices, manual payment confirmation, and payment history." />
                    <Point icon={BarChart3} title="Progress visibility" text="Use Moodle sync data where available to surface useful progress and enrollment reporting." />
                </div>
            </section>

            {/* Corporate Inquiry Form Section */}
            <section id="inquiry-form" className="bg-slate-50 py-20 border-t border-slate-200">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="text-center">
                            <Badge>B2B Program Inquiry</Badge>
                            <h2 className="mt-4 text-3xl font-bold text-skillup-navy">Request a Corporate Training Quote</h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Provide details about your team size and training objectives, and we will prepare a customized proposal.
                            </p>
                        </div>

                        {status === 'success' && (
                            <div className="mt-6 rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-800 ring-1 ring-green-100">
                                Thank you! Your corporate inquiry has been submitted. Our team will contact you soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="mt-6 rounded-lg bg-red-50 p-4 text-center text-sm font-medium text-red-800 ring-1 ring-red-100">
                                Failed to submit inquiry. Please verify all fields and try again.
                            </div>
                        )}

                        <form onSubmit={submit} className="mt-8 space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field label="Contact Person Name">
                                    <Input name="name" value={form.name} onChange={update} required placeholder="Full name" disabled={status === 'loading'} />
                                </Field>
                                <Field label="Work Email">
                                    <Input type="email" name="email" value={form.email} onChange={update} required placeholder="email@company.com" disabled={status === 'loading'} />
                                </Field>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field label="Company Name">
                                    <Input name="company_name" value={form.company_name} onChange={update} required placeholder="Company Ltd" disabled={status === 'loading'} />
                                </Field>
                                <Field label="Estimated Learners">
                                    <select
                                        name="employee_count"
                                        value={form.employee_count}
                                        onChange={update}
                                        disabled={status === 'loading'}
                                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-skillup-blue focus:ring-1 focus:ring-skillup-blue outline-none"
                                    >
                                        <option value="<50">Fewer than 50 learners</option>
                                        <option value="50-200">50 to 200 learners</option>
                                        <option value="200+">More than 200 learners</option>
                                    </select>
                                </Field>
                            </div>

                            <Field label="Training Requirements & Objectives">
                                <Textarea
                                    name="message"
                                    value={form.message}
                                    onChange={update}
                                    required
                                    placeholder="Tell us about the skills you want to build and target timelines..."
                                    disabled={status === 'loading'}
                                />
                            </Field>

                            <Button type="submit" className="w-full sm:w-auto" disabled={status === 'loading'}>
                                <Send className="mr-2 h-4 w-4" />
                                {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

function Field({ label, children }) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
            {children}
        </label>
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
