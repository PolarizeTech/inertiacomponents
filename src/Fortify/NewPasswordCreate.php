<?php

namespace Ja\Inertia\Fortify;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class NewPasswordCreate
{
    /**
     * Display the password reset view.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function __invoke(Request $request): InertiaResponse
    {
        return Inertia::render('@ja-inertia/vendor/jetstream/Pages/ResetPassword', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }
}
