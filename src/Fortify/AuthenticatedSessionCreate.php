<?php

namespace Ja\Inertia\Fortify;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AuthenticatedSessionCreate
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function __invoke(): InertiaResponse
    {
        return Inertia::render('@ja-inertia/vendor/jetstream/Pages/Login', [
            'canResetPassword' => Route::has('password.request'),
            'canRegister' => Route::has('register'),
            'status' => session('status'),
        ]);
    }
}
