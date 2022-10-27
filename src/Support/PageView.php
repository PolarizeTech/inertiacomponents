<?php

namespace Blazervel\Inertia\Support;

use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Config;
use Blazervel\Inertia\Page;
use ReflectionMethod;
use ReflectionClass;
use ReflectionProperty;
use Inertia\Inertia;
use Inertia\Response;

class PageView
{
    static function render(string $path, array $data = [], array $mergeData = [], string $rootView = null): Response
    {
        $pagePath = static::pageViewLookup($path);
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

    public static function pageViewLookup(string $path): string
    {
        // workspaces.index -> ./resources/js/Pages/Workspaces/Index.jsx
        // @blazervel_workspaces.workspaces.index -> ./vendor/.../resources/js/Pages/Workspaces/Index.jsx
        $alias = '@app';
        $path  = Str::contains($path, '.') ? explode('.', $path) : explode('/', $path);
        $path  = (new Collection($path));
        $alias = $path->filter(fn ($p) =>  Str::startsWith($p, '@'))->first() ?: $alias;
        $path  = $path->filter(fn ($p) => !Str::startsWith($p, '@'))->map(fn ($p) => Str::ucfirst(Str::camel($p)));
        $path  = $path->join('/');

        return "{$alias}/Pages/{$path}";
    }

    public static function pageComponentLookup(string $path): string
    {
        // workspaces.index -> ./app/Http/Inertia/Workspaces/Index.php
        // @blazervel_workspaces.workspaces.index -> ./vendor/.../src/Http/Inertia/Workspaces/Index.php
        $path  = Str::contains($path, '.') ? Str::replace('.', '/', $path) : $path;
        $alias = Str::startsWith($path, '@bazervel') ? '@blazervel/' . explode('/', Str::remove('@blazervel/', $path))[0] : '@app';
        $path  = Str::remove($alias, $path);
        $path  = explode('/', $path);
        $path  = (new Collection($path));
        $path  = $path->map(fn ($p) => Str::ucfirst(Str::camel($p)));
        $path  = $path->join('\\');

        $basePath = [
            '@app'                  => static::componentsNamespace(),
            '@blazervel/ui'         => 'Blazervel\\Ui\\Http\\Inertia',
            '@blazervel/inertia'    => 'Blazervel\\Inertia\\Http\\Inertia',
            '@blazervel/auth'       => 'Blazervel\\Auth\\Http\\Inertia',
            '@blazervel/workspaces' => 'Blazervel\\Workspaces\\Http\\Inertia',
        ][$alias];

        return "{$basePath}\\{$path}";
    }

    public static function componentsDir()
    {
        return Config::get('blazervel.inertia.components_dir', 'app/Http/Inertia');
    }

    public static function componentsNamespace()
    {
        return (new Collection(explode('/', static::componentsDir())))
                    ->map(fn ($slug) => (
                        Str::ucfirst(
                            Str::camel(
                                $slug
                            )
                        )
                    ))
                    ->join('\\');
    }

    public static function componentActions(string $className, array $includeInherited = []): array
    {
        $publicClassMethods = (new ReflectionClass($className))->getMethods(
            ReflectionMethod::IS_PUBLIC
        );

        $methods = (new Collection($publicClassMethods));
        $methods = $methods->where('class', $className);
        
        return $methods->pluck('name')->all();
    }

    public static function componentProperties(string $className, array $includeInherited = []): array
    {
        $publicClassProperties = (new ReflectionClass($className))->getProperties(
            ReflectionProperty::IS_PUBLIC
        );

        $properties = (new Collection($publicClassProperties));
        $properties = $properties->filter(fn ($prop) => (
            $prop->class === $className ||
            in_array($prop->name, $includeInherited)
        ));
        
        return $properties->pluck('name')->all();
    }

    public static function componentName(string $className): string
    {
        $name = $className;
        $name = Str::remove(static::componentsNamespace(), $name);
        $name = Str::replace('\\', ' ', $name);
        $name = Str::snake($name, '.');

        return $name;
    }
}