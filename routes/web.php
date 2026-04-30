<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostToggleLike;
use App\Http\Controllers\PostToggleSave;
use App\Http\Controllers\SavedPostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home.index');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about.index');

Route::get('/auth/register', [RegisterController::class, 'create']);
Route::post('/auth/register', [RegisterController::class, 'store']);

Route::get('/auth/login', [LoginController::class, 'create'])->name('login');
Route::post('/auth/login', [LoginController::class, 'store']);
Route::delete('/auth/logout', [LoginController::class, 'destroy']);

Route::post('/posts/{post}/likes/toggle', PostToggleLike::class)->middleware('auth');

Route::get('/posts/create', [PostController::class, 'create'])->middleware('auth');
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');

Route::post('/posts', [PostController::class, 'store'])->middleware('auth');
Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->middleware('auth')->name('posts.edit');
Route::put('/posts/{post}', [PostController::class, 'update'])->middleware('auth')->name('posts.update');
Route::delete('/posts/{post}', [PostController::class, 'destroy'])->middleware('auth')->name('posts.destroy');

Route::post('/comments', [CommentController::class, 'store'])->middleware('auth')->name('comments.store');
Route::get('/comments/{comment}/edit', [CommentController::class, 'edit'])->middleware('auth')->name('comments.edit');
Route::patch('/comments/{comment}', [CommentController::class, 'update'])->middleware('auth')->name('comments.update');
Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->middleware('auth')->name('comments.destroy');

// Save Post
Route::post('/posts/{post}/save',PostToggleSave::class)->middleware('auth')->name('posts.save');
Route::get('/saved', [SavedPostController::class, 'index'])->middleware('auth')->name('saved.index');

