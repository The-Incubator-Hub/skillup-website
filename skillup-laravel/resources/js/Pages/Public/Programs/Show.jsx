import { useMemo, useRef, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, X } from 'lucide-react';
import PublicLayout from '@/Components/public/PublicLayout';
import ContentBlocks from '@/Components/public/programs/ContentBlocks';
import { useHeroIntro, useRevealScope } from '@/lib/animations';

export default function Show({ program, edition, tracks, archiveEditions = [] }) {
    const scope = useRevealScope();
    const heroScope = useHeroIntro();
    const formRef = useRef(null);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const openForm = (track = null) => {
        setSelectedTrack(track);
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const startDate = edition.startsOn
        ? new Date(edition.startsOn).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        : null;

    const ageSpan = useMemo(() => {
        const mins = tracks.map((t) => t.ageMin).filter((v) => v !== null);
        const maxs = tracks.map((t) => t.ageMax).filter((v) => v !== null);

        if (!mins.length || !maxs.length) {
            return null;
        }

        return `${Math.min(...mins)} – ${Math.max(...maxs)}`;
    }, [tracks]);

    return (
        <PublicLayout>
            <Head title={edition.seoTitle}>
                {edition.seoDescription && <meta name="description" content={edition.seoDescription} />}
            </Head>

            <div ref={scope}>
                {/* Hero */}
                <section ref={heroScope} className="relative overflow-hidden bg-skillup-navy pt-[72px]">
                    {edition.heroImagePath && (
                        <img src={edition.heroImagePath} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
                    )}
                    <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center sm:py-28">
                        {ageSpan && (
                            <span data-hero className="mb-6 inline-flex items-center rounded-full bg-skillup-orange px-5 py-2 text-sm font-bold text-white">
                                For ages {ageSpan}
                            </span>
                        )}
                        <h1 data-hero className="text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                            {edition.title}
                        </h1>
                        {edition.theme && (
                            <p data-hero className="mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
                                {edition.theme}
                            </p>
                        )}
                        {startDate && (
                            <p data-hero className="mt-4 text-sm font-semibold uppercase tracking-wide text-blue-200">
                                Classes start {startDate} · {edition.scheduleText}
                            </p>
                        )}
                        {edition.acceptsRegistrations ? (
                            <button
                                data-hero
                                type="button"
                                onClick={() => openForm(null)}
                                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue-600 px-8 text-base font-semibold text-white shadow-lg transition-colors hover:bg-blue-700"
                            >
                                Register Now
                                <ArrowRight className="h-5 w-5" aria-hidden="true" />
                            </button>
                        ) : (
                            <p data-hero className="mt-8 rounded-full bg-white/10 px-6 py-2 text-sm font-semibold text-white">
                                {edition.status === 'sold_out' ? 'All seats are taken — waitlist only' : 'Registration is not open yet'}
                            </p>
                        )}
                    </div>
                </section>

                {/* Content blocks (admin-ordered) */}
                <ContentBlocks blocks={edition.content} edition={edition} tracks={tracks} onRegister={openForm} />

                {/* Micro-form */}
                {edition.acceptsRegistrations && (
                    <section ref={formRef} className="bg-white py-16" id="register">
                        <div className="mx-auto max-w-xl px-4 sm:px-6">
                            <div className="rounded-2xl border border-blue-200 bg-skillup-soft p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-skillup-navy">Register your child</h2>
                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    Two minutes now — confirm your email, secure the seat, and finish the rest after payment. Ages are
                                    counted as of {new Date(edition.ageReferenceDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}.
                                </p>
                                <MicroForm program={program} tracks={tracks} selectedTrack={selectedTrack} onClearTrack={() => setSelectedTrack(null)} />
                                <p className="mt-4 text-xs leading-5 text-gray-500">
                                    By continuing you agree to our processing of your and your ward's details to run this programme.
                                    We only ask for what the programme needs, and you can request removal anytime.
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {archiveEditions.length > 0 && (
                    <section className="bg-skillup-soft py-12">
                        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Past editions</h2>
                            <div className="mt-4 flex flex-wrap justify-center gap-3">
                                {archiveEditions.map((past) => (
                                    <Link
                                        key={past.slug}
                                        href={`/programs/${program.slug}/editions/${past.slug}`}
                                        className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-skillup-navy shadow-sm transition hover:shadow"
                                    >
                                        {past.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* Sticky mobile CTA */}
            {edition.acceptsRegistrations && (
                <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
                    <button
                        type="button"
                        onClick={() => openForm(null)}
                        className="flex h-12 w-full items-center justify-center rounded-md bg-blue-900 text-base font-semibold text-white"
                    >
                        Register Now
                    </button>
                </div>
            )}
        </PublicLayout>
    );
}

function MicroForm({ program, tracks, selectedTrack, onClearTrack }) {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const { data, setData, post, processing, errors } = useForm({
        guardian_name: '',
        guardian_email: '',
        guardian_whatsapp: '',
        participant_name: '',
        participant_dob: '',
        program_edition_track_id: selectedTrack?.id ?? '',
        src: params.get('src') ?? '',
        utm_source: params.get('utm_source') ?? '',
        utm_medium: params.get('utm_medium') ?? '',
        utm_campaign: params.get('utm_campaign') ?? '',
    });

    if (selectedTrack && data.program_edition_track_id !== selectedTrack.id) {
        setData('program_edition_track_id', selectedTrack.id);
    }

    const submit = (e) => {
        e.preventDefault();
        post(`/programs/${program.slug}/register`, { preserveScroll: true });
    };

    return (
        <form onSubmit={submit} className="mt-6 space-y-4">
            {selectedTrack && (
                <div className="flex items-center justify-between rounded-lg bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
                    Track: {selectedTrack.name}
                    <button type="button" onClick={onClearTrack} aria-label="Let age pick the track" className="text-blue-700 hover:text-blue-900">
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
            )}

            <Field label="Your full name" error={errors.guardian_name}>
                <input
                    type="text"
                    required
                    autoComplete="name"
                    value={data.guardian_name}
                    onChange={(e) => setData('guardian_name', e.target.value)}
                    className="h-12 w-full rounded-md border-slate-300 text-slate-900 focus:border-skillup-blue focus:ring-skillup-blue"
                />
            </Field>

            <Field label="Your email" error={errors.guardian_email} hint="We'll send a confirmation code here.">
                <input
                    type="email"
                    required
                    autoComplete="email"
                    value={data.guardian_email}
                    onChange={(e) => setData('guardian_email', e.target.value)}
                    className="h-12 w-full rounded-md border-slate-300 text-slate-900 focus:border-skillup-blue focus:ring-skillup-blue"
                />
            </Field>

            <Field label="Your WhatsApp number" error={errors.guardian_whatsapp}>
                <input
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    value={data.guardian_whatsapp}
                    onChange={(e) => setData('guardian_whatsapp', e.target.value)}
                    className="h-12 w-full rounded-md border-slate-300 text-slate-900 focus:border-skillup-blue focus:ring-skillup-blue"
                />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Child's full name" error={errors.participant_name}>
                    <input
                        type="text"
                        required
                        value={data.participant_name}
                        onChange={(e) => setData('participant_name', e.target.value)}
                        className="h-12 w-full rounded-md border-slate-300 text-slate-900 focus:border-skillup-blue focus:ring-skillup-blue"
                    />
                </Field>
                <Field label="Child's date of birth" error={errors.participant_dob}>
                    <input
                        type="date"
                        required
                        value={data.participant_dob}
                        onChange={(e) => setData('participant_dob', e.target.value)}
                        className="h-12 w-full rounded-md border-slate-300 text-slate-900 focus:border-skillup-blue focus:ring-skillup-blue"
                    />
                </Field>
            </div>

            {errors.program_edition_track_id && <p className="text-sm text-red-600">{errors.program_edition_track_id}</p>}

            <button
                type="submit"
                disabled={processing}
                className="flex h-12 w-full items-center justify-center rounded-md bg-blue-900 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-slate-300"
            >
                {processing ? 'Submitting…' : 'Continue — confirm email'}
            </button>
        </form>
    );
}

function Field({ label, hint, error, children }) {
    return (
        <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-800">{label}</span>
            {children}
            {hint && !error && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
            {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
        </label>
    );
}
