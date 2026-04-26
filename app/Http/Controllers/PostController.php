<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response {
        return Inertia::render('posts/index', [
            'posts' => Post::with('user')->latest()->get()
        ]);
    }

    public function show(string $id): Response {
        $post = Post::with('user')->findorFail($id);

        return Inertia::render('posts/show', [
            'post' => $post,
            'comments' => Inertia::defer(
                fn() => $post->comments()
                    ->with('user')
                    ->latest()
                    ->get()
            )
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
            'user_id' => User::inRandomOrder()->first()->id,
        ]);

        return redirect('/posts');
    }
}


