import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Show({ post, relatedPosts }) {
    return (
        <PublicLayout>
            <Head title={`${post.title} - SKILLUP Blog`} />

            {/* Back Navigation Bar */}
            <div className="bg-slate-50 border-b border-slate-200 py-4 pt-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link
                        href={route('blog.index')}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-skillup-blue"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog
                    </Link>
                </div>
            </div>

            {/* Article Content */}
            <article className="bg-white py-16">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Badge className="bg-blue-50 text-skillup-blue hover:bg-blue-50 ring-1 ring-blue-100">
                            {post.category?.name}
                        </Badge>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.published_at).toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                    </div>

                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                        {post.title}
                    </h1>

                    {post.summary && (
                        <p className="mt-6 text-xl leading-8 text-slate-600 border-l-4 border-skillup-blue pl-4 italic">
                            {post.summary}
                        </p>
                    )}

                    {post.featured_image && (
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-md"
                        />
                    )}

                    <div
                        className="prose prose-slate mt-10 max-w-none text-slate-700 leading-8"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="bg-slate-50 py-16 border-t border-slate-200">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts.map((rPost) => (
                                <article key={rPost.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                    <img
                                        src={rPost.featured_image || '/images/default-blog.jpg'}
                                        alt={rPost.title}
                                        className="aspect-[16/10] w-full object-cover"
                                    />
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="font-semibold text-skillup-blue">
                                                {rPost.category?.name}
                                            </span>
                                            <span>•</span>
                                            <span>
                                                {new Date(rPost.published_at).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <h3 className="mt-3 text-lg font-bold text-slate-900 hover:text-skillup-blue">
                                            <Link href={route('blog.show', { slug: rPost.slug })}>{rPost.title}</Link>
                                        </h3>
                                        <p className="mt-3 flex-1 text-sm text-slate-500 line-clamp-3">
                                            {rPost.summary}
                                        </p>
                                        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                                            <Link
                                                href={route('blog.show', { slug: rPost.slug })}
                                                className="inline-flex items-center gap-1 text-xs font-bold text-skillup-navy hover:text-skillup-blue"
                                            >
                                                Read More
                                                <ArrowRight className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
