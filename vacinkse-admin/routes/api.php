<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\RegistrationStepController;
use App\Http\Controllers\PlayerTeamController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Itt állítjuk be az összes API végpontot.
*/

/**
 * NYILVÁNOS ROUTE-OK
 * Ide kerül minden, amihez NEM kell bejelentkezés (token).
 */

// Bejelentkezés – innen szerzünk tokent
Route::post('/login', [AuthController::class, 'login']);

/**
 * VÉDETT ROUTE-OK
 * Minden, ami ide kerül, csak érvényes Sanctum tokennel érhető el.
 */

Route::middleware('auth:sanctum')->group(function () {

    // Authhoz kapcsolódóak
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Admin modulok – IDE KELL TOKEN
    Route::apiResource('teams', TeamController::class);
    Route::apiResource('players', PlayerController::class);
    Route::apiResource('inventory', InventoryController::class);
    Route::apiResource('registrations', RegistrationController::class);
    Route::apiResource('registration-steps', RegistrationStepController::class);
    Route::apiResource('player-team', PlayerTeamController::class);
    Route::apiResource('users', UserController::class);
});
