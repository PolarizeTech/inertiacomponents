<?php

namespace Ja\Inertia\Http\Middleware;

use Illuminate\Support\Str;
use Ja\Inertia\View\NavItem;
use Ja\Inertia\Actions\Config\App;
use Ja\Inertia\Inertia as JaInertia;
use App\Http\Middleware\HandleInertiaRequests;
use Laravel\Fortify\Fortify;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShareInertiaData
{
    public function handle($request, $next)
    {
        if (! class_exists(HandleInertiaRequests::class)) {
            Inertia::setRootView('ja-inertia::app');
        }
        
        $user = $request->user();
        $team = null;

        if ($user) {
            $team = $user->currentTeam;
        }

        Inertia::share([

            'jaInertia' => fn () => array_merge([],
                App::getConfig(),
                [
                    'alerts' => static::alerts($request)
                ]
            ),
            
            'auth' => compact('user'),

            'team' => $team,

            'teams' => fn () => $user ? $user->teams()->get() : null,

            'permissions' => function () use ($user, $team) {

                if (! $user) return [];

                $allPermissions = config('jetstream.permissions', []);

                if ($user->id === $team->user_id) {
                    $userPermissions = $allPermissions;
                } else {
                    $userPermissions = $user->teamPermissions($team);
                }

                return (
                    collect($allPermissions)
                        ->map(fn ($permission) => [$permission => in_array($permission, $userPermissions)])
                        ->collapse()
                        ->all()
                );
            }

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

    protected static function alerts(Request $request): array
    {
        $alerts = collect();
        if ($flash = $request->session()->all()['_flash'] ?? null) {
            $alerts = collect(array_merge($flash['old'], $flash['new']));
        }

        $statusKeys = [];

        if (class_exists(Fortify::class)) {
            $statusKeys['fortify'] = [
                Fortify::PASSWORD_UPDATED,
                Fortify::PROFILE_INFORMATION_UPDATED,
                Fortify::RECOVERY_CODES_GENERATED,
                Fortify::TWO_FACTOR_AUTHENTICATION_CONFIRMED,
                Fortify::TWO_FACTOR_AUTHENTICATION_DISABLED,
                Fortify::TWO_FACTOR_AUTHENTICATION_ENABLED,
                Fortify::VERIFICATION_LINK_SENT,
            ];
        }

        $statusKeys = collect($statusKeys);

        $translateStatusKey = function (string $statusKey) use ($statusKeys): string|null {
            $providerKey = (
                $statusKeys
                    ->filter(fn ($keys) => in_array($statusKey, $keys))
                    ->keys()
                    ->first()
            );

            if (! $providerKey) {
                return null;
            }

            return JaInertia::lang(
                Str::replace('-', '_', "{$providerKey}.{$statusKey}")
            );
        };

        return (
            $alerts
                ->map(fn ($type) => [$type => $request->session()->get($type)])
                ->collapse()
                ->map(fn ($message, $type) => (
                    $type === 'status' && ($translation = $translateStatusKey($message))
                      ? $translation
                      : $message
                ))
                ->all()
        );
    }
}
