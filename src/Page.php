<?php

namespace Blazervel\Inertia;

use Blazervel\Inertia\Support\PageView;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Response;

abstract class Page
{
    /**
     * Component name (for looking up the component class when invoking action call)
     */
    public string $componentName;

    /**
     * Component route (for redirecting back to main component route)
     */
    public string $componentRoute;

    protected array $errors = [];

    public function __invoke(Request $request)
    {
        $this->componentRoute = "/{$request->path()}";
        $this->componentName = $this->componentName();

        if (
            !$this->retrieveStateFromSession()
            && method_exists($this->componentClass(), 'mount')
        ) {
            // Mount extended class
            $this->mount($request);
        }

        return $this->render($request);
    }

    public function call(string $action, array $parameters, Request $request)
    {
        $this->componentRoute = "/{$request->state['componentRoute']}";
        $this->componentName = $this->componentName();

        $this->retrieveStateFromRequest($request);

        try {
            if ($parameters !== null) {
                $this->$action(
                    ...$parameters
                );
            } else {
                $this->$action();
            }

            // Store state before redirect
            $this->storeStateToSession();

        } catch(AuthorizationException $e) {
            //
        } catch(ValidationException $e) {
            // 
        }

        return redirect()->to(
            $this->componentRoute
        );
    }

    protected function mount(Request $request): void {}

    public function render(Request $request): Response
    {
        return $this->page();
    }

    protected function page(string $path = null)
    {
        $componentState = $this->componentState();

        $data = array_merge($componentState, ['component' => [
            'state' => $componentState,
            'actions' => PageView::componentActions($this->componentClass()),
            'errors' => $this->errors,
        ]]);

        return PageView::render(
            path:      $path ?: $this->componentName(),
            data:      $data,
            rootView:  $this->rootView(),
        );
    }

    private function setState(array $state): void
    {
        $this
            ->componentProperties()
            ->map(fn ($property) => (
                $this->$property = $state[$property]
            ));
    }

    private function retrieveStateFromRequest(Request $request)
    {
        if (!$state = $request->state) {
            return false;
        }

        $this->setState($state);

        return true;
    }
    
    private function retrieveStateFromSession(): bool
    {
        if (!$state = session()->get("inertia-component#{$this->componentName}")) {
            return false;
        }

        // Clear session state just incase
        session()->flash("inertia-component#{$this->componentName}", null);

        $this->setState($state);

        return true;
    }

    private function storeStateToSession(): void
    {
        session()->flash("inertia-component#{$this->componentName}", $this->componentState());
    }

    protected function rootView(): string|null
    {
        return $this->rootView ?? null;
    }

    protected function authorize(string $ability, ...$arguments): bool
    {
        Gate::authorize($ability, ...$arguments);

        return true;
    }

    protected function validate(array $rules, array $data): array
    {
        $validator = Validator::make($data, $rules);
        
        if ($errors = $validator->errors()->toArray()) {
            $this->errors = $errors;
            $validator->validate();
        }

        return $data;
    }

    private function componentClass(): string
    {
        return get_called_class();
    }

    private function componentName(): string
    {
        return PageView::componentName(
            $this->componentClass()
        );
    }

    private function componentState(): array
    {
        return (
            $this
                ->componentProperties()
                ->map(fn ($property) => [$property => $this->$property])
                ->collapse()
                ->all()
        );
    }

    private function componentProperties(): Collection
    {
        $properties = PageView::componentProperties($this->componentClass(), [
            'componentRoute',
            'componentName'
        ]);

        return (
            new Collection($properties)
        );
    }
}