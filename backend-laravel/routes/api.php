<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('/local', [AuthController::class, 'local'])->name('auth.local');
});

Route::prefix('users')->group(function () {
    Route::post('/', [UserController::class, 'store'])->name('users.createOne');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('users.getMany');
        Route::get('/me', [UserController::class, 'me'])->name('users.getMe');
        Route::get('/{user}', [UserController::class, 'show'])->name('users.getOne');
        Route::put('/{user}', [UserController::class, 'update'])->name('users.replaceOne');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('users.deleteOne');
    });
});
