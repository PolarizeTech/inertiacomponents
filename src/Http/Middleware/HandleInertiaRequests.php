<?php

namespace Blazervel\Inertia\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    public function rootView(Request $request)
    {
        return 'blazervel-ui::layouts.app';
    }
}
