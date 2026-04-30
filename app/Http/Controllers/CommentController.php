<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        Comment::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return redirect()->back();
    }

    public function edit(Comment $comment): Response {
        Gate::authorize('update', $comment);
        return Inertia::render('comments/edit', ['comment' => $comment]);
    }

    public function update(Request $request, Comment $comment): RedirectResponse {
        Gate::authorize('update', $comment);

        $validated = $request->validate([
            'body' => 'required | string | max:255',
        ]);

        $comment->update($validated);

        return redirect()->route('posts.show', $comment->post_id)->with('success', 'Comment updated successfully.');
    }

    public function destroy(Comment $comment): RedirectResponse {
        Gate::authorize('delete', $comment);

        $comment->delete();

        return redirect()->route('posts.show', $comment->post_id)->with('success', 'Comment deleted successfully.');
    }
}
