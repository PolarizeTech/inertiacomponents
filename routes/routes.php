<?php

use Illuminate\Support\Facades\Route;
use PolarizeTech\Inertia\Actions\Components;


Route::post('inertia-components/{component}/actions/{action}/call', Components\Call::class)
    ->middleware('api')
    ->name('inertia-components.components.actions.call');