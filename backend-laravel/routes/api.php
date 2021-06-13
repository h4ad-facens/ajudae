<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CauseController;
use App\Http\Controllers\OngController;
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

Route::prefix('ongs')->group(function () {
    Route::get('/', [OngController::class, 'index'])->name('ongs.getMany');
    Route::get('/{entity}', [OngController::class, 'show'])->name('ongs.getOne');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/', [OngController::class, 'store'])->name('ongs.createOne');
        Route::put('/{entity}', [OngController::class, 'update'])->name('ongs.replaceOne');
        Route::delete('/{entity}', [OngController::class, 'destroy'])->name('ongs.deleteOne');
    });
});

Route::prefix('causes')->group(function () {
    Route::get('/', [CauseController::class, 'index'])->name('causes.getMany');
    Route::get('/{entity}', [CauseController::class, 'show'])->name('causes.getOne');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/', [CauseController::class, 'store'])->name('causes.createOne');
        Route::put('/{entity}', [CauseController::class, 'update'])->name('causes.replaceOne');
        Route::delete('/{entity}', [CauseController::class, 'destroy'])->name('causes.deleteOne');
    });
});
