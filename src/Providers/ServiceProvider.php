<?php

namespace Blazervel\Inertia\Providers;

use Blazervel\Inertia\Middleware as BlazervelInertiaMiddleware;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{
    private string $path = __DIR__ . '/../..';

    public function register()
    {
        //
    }

    public function boot()
    {
        $this->loadRoutes();
        $this->loadTranslations();
        $this->loadInertiaMiddleware();
    }

    private function loadRoutes()
    {
        $this->loadRoutesFrom(
            "{$this->path}/routes/routes.php"
        );
    }

    private function loadTranslations()
    {
        $this->loadTranslationsFrom(
            "{$this->path}/lang",
            'blazervel_inertia'
        );
    }

    private function loadInertiaMiddleware(): self
    {
        $appInertiaMiddleware = 'App\Http\Middleware\HandleInertiaRequests';

        $inertiaMiddleware = class_exists($appInertiaMiddleware)
            ? $appInertiaMiddleware
            : BlazervelInertiaMiddleware::class;

        $this
            ->app
            ->make(Router::class)
            ->pushMiddlewareToGroup('web', $inertiaMiddleware);

        return $this;
    }
}
