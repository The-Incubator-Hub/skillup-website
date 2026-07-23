<?php

namespace App\Http\Controllers;

use App\Models\Content\Post;
use App\Models\Content\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $categorySlug = $request->query('category');
        
        $postsQuery = Post::with('category')
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc');

        if ($categorySlug) {
            $category = PostCategory::where('slug', $categorySlug)->first();
            if ($category) {
                $postsQuery->where('post_category_id', $category->id);
            }
        }

        $posts = $postsQuery->paginate(9)->withQueryString();
        $categories = PostCategory::withCount(['posts' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        $featuredPost = null;
        if (!$categorySlug && $posts->currentPage() === 1) {
            $featuredPost = Post::with('category')
                ->where('status', 'published')
                ->where('published_at', '<=', now())
                ->orderBy('published_at', 'desc')
                ->first();
        }

        return Inertia::render('Public/Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'featuredPost' => $featuredPost,
            'selectedCategory' => $categorySlug,
        ]);
    }

    public function show(string $slug)
    {
        $post = Post::with('category')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->firstOrFail();

        $relatedPosts = Post::with('category')
            ->where('post_category_id', $post->post_category_id)
            ->where('id', '!=', $post->id)
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('Public/Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
