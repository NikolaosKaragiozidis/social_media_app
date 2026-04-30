<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SavedPostController extends Controller
{
    public function index(Request $request)
    {
        $posts = $request->user()->savedPosts()
            ->with('user')
            ->withCount('likes')
            ->withExists(['savedByUsers as is_saved' => function ($query) {
                $query->where('user_id', auth()->id());
            }])
            ->latest()
            ->paginate(10);

        return inertia('posts/saved-posts', [
            'posts' => $posts,
        ]);
    }
}
