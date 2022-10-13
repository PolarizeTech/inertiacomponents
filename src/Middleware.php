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
                'navigation' => $this->navigation(),
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
            $this->workspaceNavigation($request),
            [
                new NavItem(
                    name:    'blazervel_inertia::navigation.home',
                    icon:    'home',
                    route:   'home',
                    routeIs: 'home',
                ),
            ],
        );
    }

    public function workspaceNavigation(Request $request): array
    {
        return [
            new NavItem(
                name:    'blazervel_workspaces::workspaces.workspaces',
                icon:    'building',
                route:   'workspaces.index',
                routeIs: 'workspaces.*',
            ),
        ];
    }

    public function workspacesShare(Request $request): array
    {
        $workspaceModelClass = '\\Blazervel\\Workspaces\\Models\\WorkspaceModel';
        $appWorkspaceModelClass = '\\App\\Models\\Workspace';
        
        if (!class_exists($workspaceModelClass)) {
            return [];
        }

        $workspaceModelClass = class_exists($appWorkspaceModelClass)
            ? $appWorkspaceModelClass
            : $workspaceModelClass;

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
