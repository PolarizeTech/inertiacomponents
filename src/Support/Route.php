<?php

namespace Blazervel\Inertia\Support;

use Closure;
use Blazervel\Inertia\Support\PageView;
use Illuminate\Support\Facades\Route as BaseRoute;
use Illuminate\Support\Collection;
use Illuminate\Routing\Route as RoutingRoute;

class Route
{
    public static function get(string $route, string|Closure $view, array $data = []): RoutingRoute
    {
        if (is_string($view)) {
            $action = fn () => PageView::render($view, $data);
        } else {
            $action = $view;
        }

        return BaseRoute::get($route, $action);
    }

    public static function define(array|string $routeViews, string|Closure $view, array $data = []): Collection|RoutingRoute
    {
        if (is_array($routeViews)) {
            return (
                (new Collection($routeViews))->map(fn ($viewOrArgs, $route) => (
                    is_array($viewOrArgs)
                        ? self::get(...$viewOrArgs)
                        : (
                            is_array($viewOrArgs)
                                ? self::get($route, ...$viewOrArgs)
                                : self::get($route, $viewOrArgs)
                        )
                ))
            );
        }

        return self::get(
            route: $routeViews,
            view: $view, 
            data: $data
        );
    }
}