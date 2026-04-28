<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response {
        return Inertia::render('posts/index', [
            'posts' => Inertia::scroll(
                fn () => Post::with('user')
                    ->withCount('likes')
                    ->latest()
                    ->cursorPaginate(10)
            ),
        ]);
    }

    public function show(string $id): Response {
        $post = Post::with('user')->findorFail($id);

        return Inertia::render('posts/show', [
            'post' => $post,
            'comments' => Inertia::scroll(
                fn() => $post->comments()
                    ->with('user')
                    ->latest()
                    ->cursorPaginate(3)
            ),

            'comments_count' => Inertia::defer(fn() => $post->comments()->count()),

            'likes' => Inertia::defer(
                fn() => [
                    'count' => $post->likes()->count(),
                    'user_has_liked' => Auth::check() ?
                        $post->likes()->where('user_id', Auth::id())->exists() : false,
                ]
            ),
        ]);
    }

    public function create(): Response {
        return Inertia::render('posts/create');
    }

    public function store(Request $request): RedirectResponse {
        $validated = $request->validate([
            'title' => 'required | string | max:60',
            'body' => 'required | string | max:255',
        ]);

        Post::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return redirect('/posts');
    }
}


