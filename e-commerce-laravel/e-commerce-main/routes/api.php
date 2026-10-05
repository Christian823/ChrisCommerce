<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrdersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);

#Productos


Route::get('/products',[ProductController::class,'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);


#Protejo las siguientes rutas para que requieran bearer token xD

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

});



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrdersController::class, 'store']);
});