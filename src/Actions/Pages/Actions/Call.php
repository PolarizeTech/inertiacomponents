<?php

namespace Ja\Inertia\Actions\Pages\Actions;

use Ja\Inertia\Support\PageView;
use Illuminate\Http\Request;

class Call
{
    public function __invoke(Request $request, string $component, string $action)
    {
        $componentClass = PageView::pageComponentLookup($component);

        return (new $componentClass)->call(
            request: $request,
            action: $action,
            parameters: $request->parameters
        );
    }
}