<?php

namespace Ja\Inertia\Providers;

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Support\Str;
use App\Http\Middleware\HandleInertiaRequests;
use Ja\Inertia\Http\Middleware\ShareInertiaData;
use Ja\Inertia\Http\Middleware\HandleInertiaRequests as BlazervelHandleInertiaRequests;
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
        $this
            ->loadRoutes()
            ->loadViews()
            ->loadTranslations()
            ->loadInertiaMiddleware();
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
            'ja_inertia'
        );

        return $this;
    }

    private function loadInertiaMiddleware(): self
    {
        $kernel = $this->app->make(Kernel::class);
        
        // if (class_exists(HandleInertiaRequests::class)) {
        //     if (!in_array(HandleInertiaRequests::class, $kernel->getMiddlewareGroups()['web'])) {
        //         $kernel->appendMiddlewareToGroup('web', HandleInertiaRequests::class);
        //     }
        //     $kernel->prependToMiddlewarePriority(HandleInertiaRequests::class);
        // } else {
        //     $kernel->appendMiddlewareToGroup('web', BlazervelHandleInertiaRequests::class);
        //     $kernel->appendToMiddlewarePriority(BlazervelHandleInertiaRequests::class);
        // }
        
        $kernel->appendMiddlewareToGroup('web', ShareInertiaData::class);
        $kernel->appendToMiddlewarePriority(ShareInertiaData::class);

        return $this;
    }

    private function path(string ...$path): string
    {
        return join('/', [
            Str::remove('src/Providers', __DIR__),
            ...$path
        ]);
    }
}
