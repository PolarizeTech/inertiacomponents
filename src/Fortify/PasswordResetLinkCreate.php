<?php

namespace Ja\Inertia\Fortify;

use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class PasswordResetLinkCreate
{
    /**
     * Display the password reset link request view.
     *
     * @return \Inertia\Response
     */
    public function __invoke(): InertiaResponse
    {
        return Inertia::render('@ja-inertia/vendor/jetstream/Pages/ForgotPassword', [
            'status' => session('status'),
        ]);
    }
}
