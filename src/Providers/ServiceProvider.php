<?php

namespace Blazervel\Inertia\Providers;

use Illuminate\Foundation\Http\Kernel;
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

    public function boot(Kernel $kernel)
    {
        $this->loadRoutes();
        $this->loadTranslations();
        $this->loadInertiaMiddleware($kernel);
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

    private function loadInertiaMiddleware(Kernel $kernel): self
    {
        $appInertiaMiddleware = 'App\Http\Middleware\HandleInertiaRequests';

        $router = $this->app->make(Router::class);

        $router->pushMiddlewareToGroup(
            'web',
            class_exists($appInertiaMiddleware)
            ? $appInertiaMiddleware
            : BlazervelInertiaMiddleware::class
        );

        return $this;
    }
}
