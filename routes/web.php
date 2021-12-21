<?php

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

Route::get('/', 'ContactController@index');

// gouping routes
Route::group(['prefix' => '/'], function () {
    Route::get('/', 'ContactController@index')->name('contacts.index');
    Route::get('/create', 'ContactController@create')->name('contacts.create');
    Route::post('/edit/{id}', 'ContactController@edit')->name('contacts.edit');
    Route::post('/store', 'ContactController@store')->name('contacts.store');
    Route::get('/show/{id}', 'ContactController@show')->name('contacts.show');
    Route::get('/delete/{id}', 'ContactController@delete')->name('contacts.delete');
});