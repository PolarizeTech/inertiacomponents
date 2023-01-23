<?php

namespace Ja\Inertia\Fortify;

use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ConfirmablePasswordPrompt
{
    /**
     * Show the confirm password view.
     *
     * @return \Inertia\Response
     */
    public function __invoke(): InertiaResponse
    {
        return Inertia::render('@ja-inertia/vendor/jetstream/Pages/ConfirmPassword');
    }
}
