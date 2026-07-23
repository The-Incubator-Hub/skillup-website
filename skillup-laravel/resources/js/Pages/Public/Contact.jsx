import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone, Share2 } from 'lucide-react';
import { useState } from 'react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';

const emptyForm = {
    name: '',
    email: '',
    subject: '',
    company: '',
    message: '',
};

export default function Contact() {
    const [form, setForm] = useState(emptyForm);
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
            const response = await fetch(route('leads.contact'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.company ? `Company: ${form.company}` : '',
                    message: `[Subject: ${form.subject}] ${form.message}`
                })
            });

            const data = await response.json();
            if (response.ok) {
                setStatus('success');
                setForm(emptyForm);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <PublicLayout>
            <Head title="Contact SKILLUP" />

            <section className="bg-skillup-navy pb-16 pt-32 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Badge className="bg-white/10 text-white ring-white/20">Contact us</Badge>
                    <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">Reach out to SKILLUP.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">
                        Ask about courses, corporate training, partnerships, Moodle enrollment, or the platform direction.
                    </p>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg md:grid-cols-[0.9fr_1.1fr]">
                    <div className="bg-blue-50 p-8 sm:p-10">
                        <h2 className="text-2xl font-bold text-skillup-navy">Get in touch</h2>
                        <div className="mt-8 space-y-6">
                            <ContactLine icon={Mail} label="Email us" value="skilluplimited@gmail.com" href="mailto:skilluplimited@gmail.com" />
                            <ContactLine icon={Phone} label="Phone number" value="+2347040309594" />
                            <ContactLine icon={MapPin} label="Location" value="Dare Adeboye Innovation Hub, Abiona Road, Redemption City, Mowe, Ogun State" />
                        </div>
                        <div className="mt-10 border-t border-blue-100 pt-6">
                            <p className="text-sm font-semibold text-slate-700">Connect with us</p>
                            <div className="mt-4 flex gap-3">
                                <Social href="https://www.facebook.com/skillupedtech" label="Facebook" icon={Share2} />
                                <Social href="#" label="Twitter" icon={Share2} />
                                <Social href="https://www.linkedin.com/company/theskillupglobal" label="LinkedIn" icon={Share2} />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 sm:p-10">
                        <h2 className="text-2xl font-bold text-skillup-navy">Have a question? Let us connect.</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            Your submission will log a lead record in the administrator dashboard and alert our team.
                        </p>
                        {status === 'success' && (
                            <div className="mt-5 rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                                Your message has been sent successfully. We will get back to you shortly!
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="mt-5 rounded-md bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                                Failed to submit message. Please verify input fields and try again.
                            </div>
                        )}
                        <form onSubmit={submit} className="mt-6 space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field label="Name">
                                    <Input name="name" value={form.name} onChange={update} required placeholder="Full name" disabled={status === 'loading'} />
                                </Field>
                                <Field label="Email">
                                    <Input type="email" name="email" value={form.email} onChange={update} required placeholder="Email address" disabled={status === 'loading'} />
                                </Field>
                            </div>
                            <Field label="Subject">
                                <Input name="subject" value={form.subject} onChange={update} required placeholder="Subject" disabled={status === 'loading'} />
                            </Field>
                            <Field label="Company">
                                <Input name="company" value={form.company} onChange={update} placeholder="Company or organization" disabled={status === 'loading'} />
                            </Field>
                            <Field label="Message">
                                <Textarea name="message" value={form.message} onChange={update} required placeholder="Write your message here" disabled={status === 'loading'} />
                            </Field>
                            <Button type="submit" className="w-full sm:w-auto" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
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

function ContactLine({ icon: Icon, label, value, href }) {
    const content = (
        <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white text-skillup-blue shadow-sm">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">{value}</p>
            </div>
        </div>
    );

    return href ? <a href={href}>{content}</a> : content;
}

function Social({ href, label, icon: Icon }) {
    return (
        <a href={href} aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm hover:text-skillup-blue">
            <Icon className="h-5 w-5" />
        </a>
    );
}
