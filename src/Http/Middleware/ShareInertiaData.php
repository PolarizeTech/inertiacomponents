<?php

namespace Blazervel\Inertia\Http\Middleware;

use Blazervel\Inertia\View\NavItem;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShareInertiaData
{
    public function handle($request, $next)
    {
        Inertia::setRootView('blazervel-ui::layouts.app');
        
        $navigation = null;
        
        if (class_exists(HandleInertiaRequests::class)) {
            $navigation = HandleInertiaRequests::navigation($request);
        }

        if (!$navigation) {
            $navigation = [
                (array) new NavItem(
                    name:    'blazervel_inertia::navigation.home',
                    icon:    'home fa-duotone',
                    href:    '/',
                    current: $request->is('/')
                ),
            ];
        }

        Inertia::share([
            'flash' => fn () => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'message' => $request->session()->get('message'),
            ],
            'blazervel' => function () use ($request, $navigation) {
                return [
                    'navigation' => array_merge(
                        $navigation,
                        static::authNavigation($request)
                    ),
                ];
            }
        ]);

        return $next($request);
    }

    public static function authNavigation(Request $request): array
    {
        if (!class_exists('\\Blazervel\\Auth\\Providers\\ServiceProvider')) {
            return [];
        }

        return [
            (array) new NavItem(
                name:    'blazervel_auth::auth.my_profile',
                icon:    'user fa-duotone',
                route:   'auth.my-profile',
                current: $request->routeIs('auth.my-profile'),
            ),
            (array) new NavItem(
                name:    'blazervel_auth::auth.logout',
                route:   'auth.logout',
                icon:    'arrow-right-from-bracket fa-duotone',
                current: false,
            ),
        ];
    }

    public static function user(Request $request): array|null
    {
        if ($user = $request->user()) {
            return $user->only('id', 'name');
        }

        return null;
    }
}
