<?php

use Illuminate\Support\Facades\Route;
use Blazervel\Inertia\Actions\Pages\Actions;


Route::post('inertia-components/{component}/actions/{action}/call', Actions\Call::class)
    ->middleware('web')
    ->name('inertia-components.components.actions.call');