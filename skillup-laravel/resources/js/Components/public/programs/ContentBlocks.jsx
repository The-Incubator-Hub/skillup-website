import { CheckCircle2, MapPin, Users } from 'lucide-react';
import FaqAccordion from '@/Components/public/FaqAccordion';

/**
 * Renders a program edition's `content` JSON — an ordered array of typed
 * blocks edited in Filament. One component per block type; unknown types
 * are skipped so old pages never crash on new block vocabularies.
 */
export default function ContentBlocks({ blocks = [], edition, tracks, onRegister }) {
    return blocks.map((block, index) => {
        const Component = BLOCKS[block.type];

        if (!Component) {
            return null;
        }

        return <Component key={`${block.type}-${index}`} data={block.data ?? {}} edition={edition} tracks={tracks} onRegister={onRegister} />;
    });
}

const BLOCKS = {
    quick_facts: QuickFacts,
    overview: Overview,
    why: WhyGrid,
    tracks: TracksGrid,
    journey: Journey,
    includes: Includes,
    team: Team,
    gallery: Gallery,
    faqs: Faqs,
    venue: Venue,
    event: EventLink,
    cta: ClosingCta,
};

function SectionHeading({ eyebrow, title, subtitle }) {
    return (
        <div className="mb-10 text-center" data-reveal>
            {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-skillup-blue">{eyebrow}</p>}
            <h2 className="text-3xl font-bold text-skillup-navy sm:text-4xl">{title}</h2>
            {subtitle && <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">{subtitle}</p>}
        </div>
    );
}

function QuickFacts({ data }) {
    const facts = data.items ?? [];

    return (
        <section className="bg-white py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8" data-reveal-group>
                {facts.map((fact) => (
                    <div key={fact.label} className="rounded-xl bg-skillup-soft p-4 text-center">
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">{fact.label}</div>
                        <div className="mt-1 text-sm font-bold leading-5 text-skillup-navy">{fact.value}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Overview({ data }) {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title={data.title ?? 'Programme Overview'} />
                <p className="text-lg leading-8 text-gray-600" data-reveal>
                    {data.body}
                </p>
            </div>
        </section>
    );
}

function WhyGrid({ data }) {
    return (
        <section className="bg-skillup-soft py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title={data.title ?? 'Why This Programme'} subtitle={data.subtitle} />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
                    {(data.items ?? []).map((item) => (
                        <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm">
                            <CheckCircle2 className="mb-4 h-8 w-8 text-skillup-blue" aria-hidden="true" />
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm leading-6 text-gray-600">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TracksGrid({ data, tracks, edition, onRegister }) {
    return (
        <section className="bg-white py-16" id="tracks">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title={data.title ?? 'The Two Tracks'} subtitle={data.subtitle} />
                <div className="grid gap-8 md:grid-cols-2" data-reveal-group>
                    {tracks.map((track) => (
                        <div key={track.id} className="flex flex-col rounded-2xl border border-blue-200 bg-skillup-soft p-8">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <span className="inline-flex items-center rounded-full bg-skillup-orange px-4 py-1 text-sm font-bold text-white">
                                    Ages {track.ageMin}–{track.ageMax}
                                </span>
                                {track.seatsRemaining !== null && (
                                    <span className={`text-sm font-semibold ${track.isFull ? 'text-red-600' : 'text-gray-600'}`}>
                                        {track.isFull ? 'Track full — waitlist open' : `${track.seatsRemaining} seats left`}
                                    </span>
                                )}
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-skillup-navy">{track.name}</h3>
                            <p className="mb-6 flex-1 text-sm leading-6 text-gray-600">{track.summary}</p>
                            <div className="flex items-center justify-between gap-4">
                                {track.amount !== null && (
                                    <div>
                                        {track.discountedAmount !== null ? (
                                            <>
                                                <span className="text-xl font-bold text-blue-900">
                                                    {track.currency} {Number(track.discountedAmount).toLocaleString()}
                                                </span>
                                                <span className="ml-2 text-sm text-gray-500 line-through">
                                                    {Number(track.amount).toLocaleString()}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-xl font-bold text-blue-900">
                                                {track.currency} {Number(track.amount).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                )}
                                {edition.acceptsRegistrations && (
                                    <button
                                        type="button"
                                        onClick={() => onRegister(track)}
                                        className="rounded-md bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                    >
                                        {track.isFull ? 'Join Waitlist' : 'Register'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Journey({ data }) {
    return (
        <section className="bg-skillup-soft py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title={data.title ?? 'The Journey'} />
                <ol className="space-y-4" data-reveal-group>
                    {(data.items ?? []).map((item, index) => (
                        <li key={item.week} className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm">
                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-skillup-blue text-lg font-bold text-white">
                                {index + 1}
                            </span>
                            <div>
                                <h3 className="font-bold text-skillup-navy">{item.week}</h3>
                                <p className="mt-1 text-sm leading-6 text-gray-600">{item.focus}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

function Includes({ data }) {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title={data.title ?? "What's Included"} subtitle={data.subtitle} />
                <ul className="grid gap-4 sm:grid-cols-2" data-reveal-group>
                    {(data.items ?? []).map((item) => (
                        <li key={item} className="flex items-start gap-3 rounded-xl bg-skillup-soft p-4">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" aria-hidden="true" />
                            <span className="text-sm leading-6 text-gray-700">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function Team({ data }) {
    return (
        <section className="bg-skillup-soft py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title={data.title ?? 'Programme Team'} />
                <div className="space-y-3" data-reveal-group>
                    {(data.items ?? []).map((item) => (
                        <div key={item.role} className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
                            <Users className="mt-1 h-6 w-6 flex-shrink-0 text-skillup-blue" aria-hidden="true" />
                            <div>
                                <h3 className="font-semibold text-gray-900">{item.role}</h3>
                                <p className="mt-1 text-sm leading-6 text-gray-600">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Gallery({ data }) {
    const images = data.images ?? [];

    if (!images.length) {
        return null;
    }

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {data.title && <SectionHeading title={data.title} subtitle={data.subtitle} />}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3" data-reveal-group>
                    {images.map((image, index) => (
                        <img
                            key={`${image.src}-${index}`}
                            src={image.src}
                            alt={image.alt ?? ''}
                            loading="lazy"
                            className="h-48 w-full rounded-xl object-cover md:h-56"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function EventLink({ data }) {
    if (!data.href) {
        return null;
    }

    return (
        <section className="bg-skillup-soft px-4 py-12">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl border border-blue-200 bg-white p-8 text-center shadow-sm" data-reveal>
                <h2 className="text-2xl font-bold text-skillup-navy">{data.title ?? 'Showcase Day'}</h2>
                {data.subtitle && <p className="max-w-xl text-sm leading-6 text-gray-600">{data.subtitle}</p>}
                <a
                    href={data.href}
                    className="inline-flex h-11 items-center justify-center rounded-md bg-blue-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                    {data.cta ?? 'View event details'}
                </a>
            </div>
        </section>
    );
}

function Faqs({ data }) {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title={data.title ?? 'Frequently Asked Questions'} />
                <div data-reveal>
                    <FaqAccordion items={data.items ?? []} />
                </div>
            </div>
        </section>
    );
}

function Venue({ data, edition }) {
    return (
        <section className="bg-skillup-soft py-16">
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8" data-reveal>
                <MapPin className="mx-auto mb-4 h-10 w-10 text-skillup-orange" aria-hidden="true" />
                <h2 className="text-3xl font-bold text-skillup-navy">{data.title ?? 'Venue'}</h2>
                <p className="mt-3 text-lg font-semibold text-gray-800">{edition.venueName}</p>
                <p className="mt-1 text-gray-600">{edition.venueAddress}</p>
                {data.note && <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">{data.note}</p>}
                {edition.venueMapUrl && (
                    <a
                        href={edition.venueMapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-md border-2 border-skillup-blue px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-blue-900 hover:text-white"
                    >
                        Open in Maps
                    </a>
                )}
            </div>
        </section>
    );
}

function ClosingCta({ data, edition, onRegister }) {
    return (
        <section className="px-4 py-12">
            <div className="mx-auto flex max-w-[1296px] flex-col items-center gap-6 rounded-2xl bg-skillup-deep px-6 py-16 text-center" data-reveal>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">{data.title ?? 'Secure a seat'}</h2>
                {data.subtitle && <p className="max-w-2xl text-lg text-blue-100">{data.subtitle}</p>}
                {edition.acceptsRegistrations && (
                    <button
                        type="button"
                        onClick={() => onRegister(null)}
                        className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-base font-semibold text-blue-900 shadow-sm transition hover:bg-blue-50"
                    >
                        {data.cta ?? 'Register Now'}
                    </button>
                )}
            </div>
        </section>
    );
}
