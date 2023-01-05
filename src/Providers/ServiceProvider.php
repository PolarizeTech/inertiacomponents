<?php

namespace Ja\Inertia\Providers;

use Illuminate\Contracts\Http\Kernel;
use App\Providers\FortifyServiceProvider;
use Laravel\Fortify\Fortify;
use App\Providers\JetstreamServiceProvider;
use Laravel\Jetstream\Jetstream;
use Laravel\Jetstream\Features as JetstreamFeatures;
use Laravel\Jetstream\Http\Middleware\AuthenticateSession;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Ja\Inertia\Http\Middleware\ShareInertiaData;
use Ja\Inertia\Inertia as JaInertia;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{
    private ?array $providers = null;

    public function register()
    {
        if (class_exists(Jetstream::class)) {
            Jetstream::$registersRoutes = false;
        }
    }

    public function boot()
    {
        $this
            ->loadRoutes()
            ->loadViews()
            ->loadTranslations()
            ->loadInertiaMiddleware();

        if (
            !$this->hasProvider(FortifyServiceProvider::class) &&
            class_exists(Fortify::class)
        ) {
            $this->loadFortify();
        }

        if (class_exists(Jetstream::class)) {

            $this->loadJetstreamRoutes();

            if (! $this->hasProvider(JetstreamServiceProvider::class)) {
                $this
                    ->loadJetstream()
                    ->loadJetstreamPermissions();
            }
        }
    }

    private function loadRoutes()
    {
        $this->loadRoutesFrom(
            $this->path('routes/routes.php')
        );

        return $this;
    }

    private function loadViews(): self
    {
        $this->loadViewsFrom(
            $this->path('resources/views'),
            'ja-inertia'
        );

        return $this;
    }

    private function loadTranslations()
    {
        $this->loadTranslationsFrom(
            $this->path('lang'),
            JaInertia::translationsKey
        );

        return $this;
    }

    private function loadInertiaMiddleware(): self
    {
        $kernel = $this->app->make(Kernel::class);
        $kernel->appendMiddlewareToGroup('web', ShareInertiaData::class);
        $kernel->appendToMiddlewarePriority(ShareInertiaData::class);

        return $this;
    }

    private function loadFortify()
    {
        Config::set(['fortify.views' => false]);

        // Register inertia views and routes for fortify
        $this->loadRoutesFrom(
            static::path('routes/fortify.php')
        );

        Fortify::createUsersUsing(
            $this->fallback(
                \App\Actions\Fortify\CreateNewUser::class,
                \Ja\Inertia\Fortify\CreateNewUser::class
            )
        );

        Fortify::updateUserProfileInformationUsing(
            $this->fallback(
                \App\Actions\Fortify\UpdateUserProfileInformation::class,
                \Ja\Inertia\Fortify\UpdateUserProfileInformation::class
            )
        );

        Fortify::updateUserPasswordsUsing(
            $this->fallback(
                \App\Actions\Fortify\UpdateUserPassword::class,
                \Ja\Inertia\Fortify\UpdateUserPassword::class
            )
        );

        Fortify::resetUserPasswordsUsing(
            $this->fallback(
                \App\Actions\Fortify\ResetUserPassword::class,
                \Ja\Inertia\Fortify\ResetUserPassword::class
            )
        );
  
        RateLimiter::for('login', function (Request $request) {
            $email = (string) $request->email;
  
            return Limit::perMinute(5)->by($email.$request->ip());
        });
  
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        return $this;
    }

    private function loadJetstream(): self
    {
        // Set jetstream config defaults
        if (Config::get('jetstream.features', null) === null) {
            foreach([
                'middleware'         => ['web'],
                'auth_session'       => AuthenticateSession::class,
                'guard'              => 'sanctum',
                'profile_photo_disk' => 'public',
                'stack'              => 'inertia',
                'features'           => [
                    JetstreamFeatures::termsAndPrivacyPolicy(),
                    JetstreamFeatures::api(),
                    JetstreamFeatures::profilePhotos(),
                    JetstreamFeatures::teams(['invitations' => true]),
                    JetstreamFeatures::accountDeletion(),
                ],
            ] as $key => $value) {
                Config::set("jetstream.{$key}", $value);
            }
        }
        
        Jetstream::createTeamsUsing(
            $this->fallback(
                \App\Actions\Jetstream\CreateTeam::class,
                \Ja\Inertia\Jetstream\CreateTeam::class
            )
        );

        Jetstream::updateTeamNamesUsing(
            $this->fallback(
                \App\Actions\Jetstream\UpdateTeamName::class,
                \Ja\Inertia\Jetstream\UpdateTeamName::class
            )
        );

        Jetstream::addTeamMembersUsing(
            $this->fallback(
                \App\Actions\Jetstream\AddTeamMember::class,
                \Ja\Inertia\Jetstream\AddTeamMember::class
            )
        );

        Jetstream::inviteTeamMembersUsing(
            $this->fallback(
                \App\Actions\Jetstream\InviteTeamMember::class,
                \Ja\Inertia\Jetstream\InviteTeamMember::class
            )
        );

        Jetstream::removeTeamMembersUsing(
            $this->fallback(
                \App\Actions\Jetstream\RemoveTeamMember::class,
                \Ja\Inertia\Jetstream\RemoveTeamMember::class
            )
        );

        Jetstream::deleteTeamsUsing(
            $this->fallback(
                \App\Actions\Jetstream\DeleteTeam::class,
                \Ja\Inertia\Jetstream\DeleteTeam::class
            )
        );

        Jetstream::deleteUsersUsing(
            $this->fallback(
                \App\Actions\Jetstream\DeleteUser::class,
                \Ja\Inertia\Jetstream\DeleteUser::class
            )
        );

        return $this;
    }

    protected function loadJetstreamPermissions(): self
    {
        Jetstream::defaultApiTokenPermissions(['read']);

        Jetstream::role('admin', 'Administrator', [
            'create',
            'read',
            'update',
            'delete',
        ])->description('Administrator users can perform any action.');

        Jetstream::role('editor', 'Editor', [
            'read',
            'create',
            'update',
        ])->description('Editor users have the ability to read, create, and update.');

        // Register user-defined roles
        // Roles::get()->map(fn ($role) => (
        //     Jetstream::role(
        //         $role->id,
        //         $role->name,
        //         $role->permissions
        //     )->description(
        //         $role->description
        //     )
        // ));

        return $this;
    }

    protected function loadJetstreamRoutes(): self
    {
        // Register inertia views and routes for jetstream
        $this->loadRoutesFrom(
            static::path('routes/jetstream.php')
        );

        return $this;
    }

    private function fallback(string $class, ...$classes): string
    {
        if (class_exists($class)) {
            return $class;
        }

        foreach ($classes as $class) {
            if (class_exists($class)) {
                return $class;
            }
        }
    }

    private function hasProvider(string $provider): bool
    {
        if (!$this->providers) {
            $this->providers = config('app.providers');
        }

        return in_array($provider, $this->providers);
    }

    private function path(string ...$path): string
    {
        return join('/', [
            Str::remove('src/Providers', __DIR__),
            ...$path
        ]);
    }
}
