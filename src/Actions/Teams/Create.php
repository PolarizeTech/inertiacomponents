<?php

namespace Ja\Inertia\Actions\Teams;

use Illuminate\Http\Request;
use Inertia\Inertia;

class Create
{
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $user = array_merge($user->toArray(), [
            'profilePhotoUrl' => $user->profile_photo_Url
        ]);

        return Inertia::render('@ja-inertia/vendor/jetstream/Pages/Teams/Create', compact('user'));
    }
}