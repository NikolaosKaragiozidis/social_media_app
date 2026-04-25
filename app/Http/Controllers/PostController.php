<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Post;

class PostController extends Controller
{
    //
    public function show(string $id): Response {
        return Inertia::render('posts/show', [
            'post' => Post::findOrFail($id)
        ]);
    }
}
