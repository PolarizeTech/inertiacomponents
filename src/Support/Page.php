<?php

namespace Blazervel\Inertia\Support;

use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class Page
{
    static function render(string $path, array $data = [], array $mergeData = [], string $rootView = null): Response
    {
        $pagePath = (new self)->translatePathAndAlias($path);
        $data = array_merge($data, $mergeData);

        if ($rootView) {
            Inertia::rootView($rootView);
        }

        return Inertia::render(
            $pagePath,
            array_merge(
                $data,
                $mergeData
            )
        );
    }

    private function translatePathAndAlias(string $path): string
    {
        $alias = '@app';
        $path  = Str::contains($path, '.') ? explode('.', $path) : explode('/', $path);
        $path  = (new Collection($path));
        $alias = $path->filter(fn ($p) =>  Str::startsWith($p, '@'))->first() ?: $alias;
        $path  = $path->filter(fn ($p) => !Str::startsWith($p, '@'))->map(fn ($p) => Str::ucfirst(Str::camel($p)));
        $path  = $path->join('/');

        return "{$alias}/Pages/{$path}";
    }
}