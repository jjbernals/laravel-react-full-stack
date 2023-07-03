<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function (){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout',[AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);

});


Route::post('/signup',[AuthController::class, 'signup']);
Route::post('/login',[AuthController::class, 'login']);
Route::controller(TeamController::class)->group(function (){
    Route::get('/team', 'index');
    Route::post('/team', 'store');
    Route::get('/team/{id}', 'show');
    Route::post('/team/member', 'newMember');
});
Route::controller(TaskController::class)->group(function () {
    Route::post('/task', 'store');
    Route::post('/task/upload/{task}/{file}', 'uploadFiles');
    Route::get('/task/{id}', 'show');
    Route::put('/task/{id}/{status}', 'update');
});
