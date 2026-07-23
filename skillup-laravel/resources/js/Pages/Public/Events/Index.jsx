import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { Calendar, Clock, Video, ArrowRight, PlayCircle } from 'lucide-react';

export default function Index({ events }) {
    const upcomingEvents = events.filter((e) => e.status === 'upcoming' || e.status === 'live');
    const pastEvents = events.filter((e) => e.status === 'completed');

    return (
        <PublicLayout>
            <Head title="Events & Webinars - SKILLUP" />

            <section className="bg-skillup-navy pb-16 pt-32 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Badge className="bg-white/10 text-white ring-white/20">SkillUp Events</Badge>
                    <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                        Join Our Free Webinars, Masterclasses, and Tech Info Sessions.
                    </h1>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Upcoming Events</h2>

                    {upcomingEvents.length === 0 ? (
                        <div className="text-center py-12 rounded-lg border border-dashed border-slate-300 bg-slate-50">
                            <p className="text-slate-500 font-semibold">No upcoming events scheduled right now. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2">
                            {upcomingEvents.map((event) => (
                                <div key={event.id} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-blue-50 text-skillup-blue ring-1 ring-blue-100 uppercase hover:bg-blue-50">
                                                {event.type}
                                            </Badge>
                                            {event.status === 'live' && (
                                                <Badge className="bg-red-500 text-white motion-safe:animate-pulse">LIVE NOW</Badge>
                                            )}
                                        </div>

                                        <h3 className="mt-4 text-2xl font-bold text-slate-900">{event.title}</h3>

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar className="h-4 w-4 text-skillup-blue" />
                                                <span>{new Date(event.starts_at).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Clock className="h-4 w-4 text-skillup-blue" />
                                                <span>
                                                    {new Date(event.starts_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} - {new Date(event.ends_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4 text-sm text-slate-500 line-clamp-3" dangerouslySetInnerHTML={{ __html: event.description }} />
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-xs text-slate-500 font-semibold">
                                            {event.registration_limit 
                                                ? `${event.registration_limit - event.registered_count} seats left`
                                                : 'Open registration'}
                                        </span>

                                        <Link
                                            href={route('events.show', { slug: event.slug })}
                                            className="inline-flex items-center gap-2 rounded-lg bg-skillup-blue px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-skillup-blue/90"
                                        >
                                            Register Now
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Past Events & Recordings */}
            {pastEvents.length > 0 && (
                <section className="bg-slate-50 py-16 border-t border-slate-200">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Past Events & Recordings</h2>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {pastEvents.map((event) => (
                                <div key={event.id} className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <Badge className="bg-slate-100 text-slate-700">{event.type}</Badge>
                                            <Badge className="bg-slate-200 text-slate-800">COMPLETED</Badge>
                                        </div>

                                        <h3 className="mt-4 text-lg font-bold text-slate-900 line-clamp-2">{event.title}</h3>

                                        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>{new Date(event.starts_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center justify-end">
                                        {event.recording_url ? (
                                            <a
                                                href={event.recording_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-700"
                                            >
                                                <PlayCircle className="h-4 w-4" />
                                                Watch Recording
                                            </a>
                                        ) : (
                                            <span className="text-xs text-slate-400">No recording available</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
