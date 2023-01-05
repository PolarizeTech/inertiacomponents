<?php

namespace Ja\Inertia\Actions\Teams;

use Illuminate\Http\Request;
use Inertia\Inertia;

class Create
{
    public function __invoke(Request $request)
    {
        return Inertia::render('@ja-inertia/react/jetstream/Pages/Teams/Create', [
            'auth' => fn () => [
                'user' => [
                    'teams' => $request->user()->teams()->get()
                ]
            ]
        ]);
    }
}