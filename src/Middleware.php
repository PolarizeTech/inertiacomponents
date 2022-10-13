<?php

namespace Blazervel\Inertia;

use Blazervel\Inertia\View\NavItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Middleware as InertiaMiddleware;

class Middleware extends InertiaMiddleware
{
    public function rootView(Request $request)
    {
        return Config::get('root_view') ?: 'blazervel-ui::layouts.app';
    }

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {

        return array_merge(
            parent::share($request), 
            $this->workspacesShare($request),
            [
                'navigation' => $this->navigation($request),
                'auth.user' => fn () => self::user($request),
                'alerts' => [
                    'success' => fn () => $request->session()->get('success'),
                    'danger' => fn () => $request->session()->get('danger'),
                    'warning' => fn () => $request->session()->get('warning'),
                ],
            ]
        );
    }

    public function navigation(Request $request): array
    {
        return array_merge(
            [
                new NavItem(
                    name:    'blazervel_inertia::navigation.home',
                    icon:    'home fa-duotone',
                    route:   'home',
                    routeIs: 'home',
                ),
            ],
            $this->workspaceNavigation($request),
            $this->authNavigation($request)
        );
    }

    public function authNavigation(): array
    {
        if (!class_exists('\\Blazervel\\Auth\\Providers\\ServiceProvider')) {
            return [];
        }

        return [
            new NavItem(
                name:    'blazervel_auth::auth.logout',
                route:   'auth.logout',
                icon:    'arrow-right-from-bracket fa-duotone',
                current: false,
            ),
        ];
    }

    public function workspaceNavigation(Request $request): array
    {
        if (!$workspaceModelClass = $this->workspaceModelClass()) {
            return [];
        }

        $workspace = $workspaceModelClass::current();
        $user = $request->user();

        return [
            new NavItem(
                name:    'blazervel_workspaces::workspaces.workspaces',
                icon:    'building fa-duotone',
                route:   'workspaces.index',
                routeIs: 'workspaces.*',
            ),
            new NavItem(
                name:    'blazervel_workspaces::users.users',
                icon:    'users fa-duotone',
                route:    ['workspaces.users.index', $workspace],
                routeIs: 'workspaces.users.*'
            ),
            new NavItem(
                name:    'blazervel_workspaces::users.my-profile',
                icon:    'user fa-duotone',
                route:    ['workspaces.users.edit', ['workspace' => $workspace, 'user' => $user]],
                current: $request->is("workspaces/*/users/{$user->uuid}/edit"),
            ),
        ];
    }

    public function workspaceModelClass()
    {
        $workspaceModelClass = '\\Blazervel\\Workspaces\\Models\\WorkspaceModel';
        $appWorkspaceModelClass = '\\App\\Models\\Workspace';
        
        if (!class_exists($workspaceModelClass)) {
            return null;
        }

        return (
            class_exists($appWorkspaceModelClass)
                ? $appWorkspaceModelClass
                : $workspaceModelClass
        );
    }

    public function workspacesShare(Request $request): array
    {
        if (!$workspaceModelClass = $this->workspaceModelClass()) {
            return [];
        }

        $userWorkspaces = $request->user()
            ? $request->user()->workspaces()->get()
            : [];

        return [
            'currentWorkspace' => $workspaceModelClass::current(),
            'workspaces' => $userWorkspaces,
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
