<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AccomodationProviderController;
use App\Http\Controllers\FoodProviderController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
 
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::resource('/pg',AccomodationProviderController::class);
Route::get('/pg-search',[AccomodationProviderController::class,'pgSearch'])->name('pg-search');
Route::get('/pg-appoinment/{id}',[AccomodationProviderController::class,'pgAppointment'])->name('pg-appointment');
Route::post('/pg-store_app',[AccomodationProviderController::class,'store_app'])->name('store-app');

Route::resource('/fp',FoodProviderController::class);
Route::get('/fp-search',[FoodProviderController::class,'fpSearch'])->name('fp-search');

Route::get('bookMeal/{id}/{meal}',[FoodProviderController::class,'bookMeal'])->name('fp.bookMeal');
Route::post('updateUser',[HomeController::class,'updateUser'])->name('updateUser');
 

 
