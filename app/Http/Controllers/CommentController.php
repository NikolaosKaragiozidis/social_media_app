<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

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
            'user_id' => User::inRandomOrder()->first()->id,
        ]);

        return redirect()->back();
    }
}
