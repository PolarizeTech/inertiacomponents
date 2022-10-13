<?php

namespace Blazervel\Inertia\View;

use Blazervel\Inertia\Exceptions\BlazervelInertiaException;
use Illuminate\Support\Facades\Lang;

class NavItem
{
    public string $name;

    public string $href;

    public string $icon;

    public bool $current;

    public function __construct(
        string $name,
        string $route = null,
        string $routeIs = null,
        string $href = null,
        string $icon = null,
        bool $current = null
    )
    {
        if (Lang::has($name) && !is_array($trName = Lang::get($name))) {
            $this->name = $trName;
        } else {
            $this->name = $name;
        }

        $this->icon = $icon;
        
        if ($href) {
            $this->href = $href;
        } elseif ($route) {
            $this->href = route($route);
        } else {
            $this->href = '';
        }
        
        if ($current !== null) {
            $this->current = $current;
        } elseif ($routeIs) {
            $this->current = request()->routeIs($routeIs);
        } else {
            $this->current = request()->is($this->href);
        }

        $this->current = $current !== null 
            ? $current 
            : request()->is($this->href);
    }
}