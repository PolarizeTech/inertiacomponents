<?php

namespace Ja\Inertia;

use Laravel\Fortify\Fortify;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;

class Inertia
{
    const translationsKey = 'ja_inertia';

    public static function alerts(Request $request): array
    {
        $alerts = $request->session()->all()['_flash'];
        $alerts = collect(array_merge($alerts['old'], $alerts['new']));

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

            return static::lang(Str::replace('-', '_', "{$providerKey}.{$statusKey}"));
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

    protected static function lang(string $key): string
    {
        if (Lang::has($key) && !is_array($tr = Lang::get($key))) {
            return $tr;
        }

        return Lang::get(implode('::', [static::translationsKey, $key]));
    }

}