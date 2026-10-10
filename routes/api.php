<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Product endpoints now live in routes/web.php behind session auth.
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
