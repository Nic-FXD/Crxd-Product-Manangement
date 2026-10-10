<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Auth::check()
        ? redirect()->route('dashboard')
        : Inertia::render('Welcome');
})->name('home');

Route::middleware('auth')->group(function () {
    // Inertia pages
    Route::get('/dashboard', fn () => Inertia::render('Dashboard/page'))->name('dashboard');
    Route::get('/products', fn () => Inertia::render('Products/page'))->name('products');

    // Profile (from the starter template)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // JSON API used by the React pages (session + CSRF protected via the web middleware group).
    Route::prefix('api')->group(function () {
        Route::get('/stats', [ProductController::class, 'stats']);
        Route::get('/products', [ProductController::class, 'index']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    });
});

require __DIR__.'/auth.php';
