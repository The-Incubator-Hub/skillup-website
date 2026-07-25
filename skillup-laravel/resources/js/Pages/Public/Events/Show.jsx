import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { Calendar, Clock, ArrowLeft, Send } from 'lucide-react';

export default function Show({ event }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        phone: ''
    });

    const submitRegistration = (e) => {
        e.preventDefault();
        post(route('events.register', { slug: event.slug }), {
            onSuccess: () => reset()
        });
    };

    return (
        <PublicLayout>
            <Head title={`${event.title} - Event details`} />

            {/* Back Navigation Bar */}
            <div className="bg-slate-50 border-b border-slate-200 py-4 pt-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link
                        href={route('events.index')}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-skillup-blue"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Events
                    </Link>
                </div>
            </div>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-12">
                        {/* Event Details */}
                        <div className="lg:col-span-7">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-blue-50 text-skillup-blue ring-1 ring-blue-100 uppercase hover:bg-blue-50">
                                    {event.type}
                                </Badge>
                                {event.status === 'live' && (
                                    <Badge className="bg-red-500 text-white motion-safe:animate-pulse">LIVE NOW</Badge>
                                )}
                            </div>

                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                {event.title}
                            </h1>

                            <div className="mt-6 grid gap-4 rounded-xl border border-slate-100 bg-slate-50 p-6 sm:grid-cols-2">
                                <div className="flex gap-3">
                                    <Calendar className="h-5 w-5 text-skillup-blue shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Date</div>
                                        <div className="mt-1 text-sm font-bold text-slate-800">
                                            {new Date(event.starts_at).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Clock className="h-5 w-5 text-skillup-blue shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Time</div>
                                        <div className="mt-1 text-sm font-bold text-slate-800">
                                            {new Date(event.starts_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} - {new Date(event.ends_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="prose prose-slate mt-8 max-w-none text-slate-700 leading-8"
                                dangerouslySetInnerHTML={{ __html: event.description }}
                            />
                        </div>

                        {/* Registration Box */}
                        <div className="lg:col-span-5">
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-32">
                                <h2 className="text-xl font-bold text-slate-900">Register for Event</h2>
                                <p className="mt-2 text-sm text-slate-500">
                                    Fill in your details below to save your seat for this event.
                                </p>

                                {wasSuccessful ? (
                                    <div className="mt-6 rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-800 ring-1 ring-green-100">
                                        You have successfully registered for the event! Check your inbox for the confirmation email.
                                    </div>
                                ) : (
                                    <form onSubmit={submitRegistration} className="mt-6 space-y-4">
                                        {errors.message && (
                                            <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800 ring-1 ring-red-100">
                                                {errors.message}
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Jane Doe"
                                                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-skillup-blue focus:ring-1 focus:ring-skillup-blue outline-none"
                                            />
                                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="jane@example.com"
                                                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-skillup-blue focus:ring-1 focus:ring-skillup-blue outline-none"
                                            />
                                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700">Phone Number (Optional)</label>
                                            <input
                                                type="text"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="+234 80 1234 5678"
                                                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-skillup-blue focus:ring-1 focus:ring-skillup-blue outline-none"
                                            />
                                            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing || event.status !== 'upcoming'}
                                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-skillup-blue py-3 text-sm font-semibold text-white hover:bg-skillup-blue/90 disabled:bg-slate-300 disabled:cursor-not-allowed"
                                        >
                                            <Send className="h-4 w-4" />
                                            {event.status === 'upcoming' ? 'Register Seat' : 'Registrations Closed'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
