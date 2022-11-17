<?php

namespace Ja\Inertia\Http\Middleware;

use Ja\Inertia\View\NavItem;
use Ja\Inertia\Actions\Config\App;

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShareInertiaData
{
    public function handle($request, $next)
    {
        Inertia::setRootView('ja-inertia::app');
        
        $navigation = null;
        
        if (method_exists(HandleInertiaRequests::class, 'navigation')) {
            $navigation = HandleInertiaRequests::navigation($request);
        }

        if (!$navigation) {
            $navigation = [
                (array) new NavItem(
                    name:    'js_inertia::navigation.home',
                    icon:    'home fa-duotone',
                    href:    '/',
                    current: $request->is('/')
                ),
            ];
        }

        Inertia::share([

            'alerts' => fn () => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'message' => $request->session()->get('message'),
            ],
            
            'jaInertia' => fn () => App::getConfig(),

            // 'navigation' => fn () => array_merge(
            //     $navigation,
            //     static::authNavigation($request)
            // ),

        ]);

        return $next($request);
    }

    public static function authNavigation(Request $request): array
    {
        return [
            (array) new NavItem(
                name:    'ja-inertia::auth.my_profile',
                icon:    'user fa-duotone',
                route:   'auth.my-profile',
                current: $request->routeIs('auth.my-profile'),
            ),
            (array) new NavItem(
                name:    'ja-inertia::auth.logout',
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
