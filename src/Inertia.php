<?php

namespace Ja\Inertia;

use Laravel\Fortify\Fortify;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;

class Inertia
{
    const translationsKey = 'ja_inertia';

    public static function lang(string $key): string
    {
        if (Lang::has($key) && !is_array($tr = Lang::get($key))) {
            return $tr;
        }

        return Lang::get(implode('::', [static::translationsKey, $key]));
    }

}