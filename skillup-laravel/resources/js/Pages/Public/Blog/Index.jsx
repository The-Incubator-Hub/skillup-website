import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Components/public/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function Index({ posts, categories, featuredPost, selectedCategory }) {
    return (
        <PublicLayout>
            <Head title="Blog & Insights - SKILLUP" />

            <section className="bg-skillup-navy pb-16 pt-32 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Badge className="bg-white/10 text-white ring-white/20">SkillUp Blog</Badge>
                    <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                        Insights, Stories, and Updates from the Tech Frontier.
                    </h1>
                </div>
            </section>

            {/* Category Filter */}
            <section className="bg-slate-50 border-y border-slate-200 py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-slate-500 mr-2">Categories:</span>
                        <Link
                            href={route('blog.index')}
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                                !selectedCategory
                                    ? 'bg-skillup-blue text-white'
                                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            All Posts
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={route('blog.index', { category: cat.slug })}
                                className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                                    selectedCategory === cat.slug
                                        ? 'bg-skillup-blue text-white'
                                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                {cat.name} ({cat.posts_count})
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="bg-white py-12 border-b border-slate-100">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                            <div className="lg:col-span-7">
                                <img
                                    src={featuredPost.featured_image || '/images/default-blog.jpg'}
                                    alt={featuredPost.title}
                                    className="aspect-[16/9] w-full rounded-2xl object-cover shadow-md"
                                />
                            </div>
                            <div className="lg:col-span-5">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Badge className="bg-blue-50 text-skillup-blue hover:bg-blue-50 ring-1 ring-blue-100">
                                        {featuredPost.category?.name}
                                    </Badge>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(featuredPost.published_at).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    {featuredPost.title}
                                </h2>
                                <p className="mt-4 text-base leading-7 text-slate-600">
                                    {featuredPost.summary || (featuredPost.content ? featuredPost.content.substring(0, 160) + '...' : '')}
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href={route('blog.show', { slug: featuredPost.slug })}
                                        className="inline-flex items-center gap-2 rounded-lg bg-skillup-navy px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-skillup-navy/90"
                                    >
                                        Read Article
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Articles Grid */}
            <section className="bg-slate-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">
                        {selectedCategory ? 'Category Articles' : 'Recent Articles'}
                    </h2>

                    {posts.data.length === 0 ? (
                        <div className="text-center py-12 rounded-lg border border-dashed border-slate-300 bg-white">
                            <p className="text-slate-500">No blog posts found matching your criteria.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {posts.data.map((post) => (
                                    <article key={post.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <img
                                            src={post.featured_image || '/images/default-blog.jpg'}
                                            alt={post.title}
                                            className="aspect-[16/10] w-full object-cover"
                                        />
                                        <div className="flex flex-1 flex-col p-6">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="font-semibold text-skillup-blue">
                                                    {post.category?.name}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    {new Date(post.published_at).toLocaleDateString(undefined, {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <h3 className="mt-3 text-lg font-bold text-slate-900 hover:text-skillup-blue">
                                                <Link href={route('blog.show', { slug: post.slug })}>{post.title}</Link>
                                            </h3>
                                            <p className="mt-3 flex-1 text-sm text-slate-500 line-clamp-3">
                                                {post.summary}
                                            </p>
                                            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                                                <Link
                                                    href={route('blog.show', { slug: post.slug })}
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

                            {/* Pagination */}
                            {posts.links.length > 3 && (
                                <div className="mt-12 flex justify-center gap-1">
                                    {posts.links.map((link, idx) => (
                                        <Link
                                            key={idx}
                                            href={link.url || '#'}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`rounded px-3 py-1.5 text-xs font-medium ${
                                                link.active
                                                    ? 'bg-skillup-navy text-white'
                                                    : link.url
                                                    ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                                    : 'bg-white text-slate-300 cursor-not-allowed border border-slate-100'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
