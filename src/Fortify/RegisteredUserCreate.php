<?php

namespace Ja\Inertia\Fortify;

use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class RegisteredUserCreate
{
    public function __invoke(): InertiaResponse
    {
        return Inertia::render('@ja-inertia/vendor/jetstream/Pages/Register');
    }
}
