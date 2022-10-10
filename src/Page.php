<?php

namespace Blazervel\Inertia;

use Blazervel\Inertia\Support\Page as InertiaPage;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Response;
use ReflectionClass;
use ReflectionMethod;
use ReflectionProperty;

abstract class Page
{
    protected Request $request;

    protected array $errors = [];

    public function mount(Request $request): void
    {
        //
    }

    public function render(Request $request): Response
    {
        return $this->page();
    }

    public function __invoke(Request $request)
    {
        $this->request = $request;

        if ($state = $this->request->state) {
            $this->setState($state);
        } else {
            $this->mount($request);
        }

        if ($action = $request->action) {
            try {
                $this->$action($request->data);
            } catch(ValidationException $e) {
                // 
            }
        }

        return $this->render($request);
    }

    private function setState(array $state = []): void
    {
        $properties = $this->componentProperties();

        (new Collection($properties))
            ->map(fn ($property) => (
                $this->$property = $state[$property]
            ));
    }

    protected function rootView(): string|null
    {
        return $this->rootView ?? null;
    }

    protected function page(string $path = null, array $data = [])
    {
        return InertiaPage::render(
            path:      $path ?: $this->componentName(),
            data:      $this->data($data),
            rootView:  $this->rootView(),
        );
    }

    protected function validate(array $rules = [], array $data = null): array|ValidationException
    {
        $data = $data ?: $this->request->data ?: [];

        $validator = Validator::make($data, $rules);
        
        $this->errors = $validator->errors()->toArray();

        $validator->validate();

        return $data;
    }

    private function data(array $data = []): array
    {
        return array_merge(
            $data,
            $state = $this->componentState(),
            $this->componentData(['state' => $state])
        );
    }

    private function componentActions(): array
    {
        $childMethods  = new ReflectionClass(get_called_class());
        $childMethods  = $childMethods->getMethods(ReflectionMethod::IS_PUBLIC);
        $childMethods  = (new Collection($childMethods))->pluck('name')->all();
        
        $parentMethods = new ReflectionClass(Component::class);
        $parentMethods = $parentMethods->getMethods(ReflectionMethod::IS_PUBLIC);
        $parentMethods = (new Collection($parentMethods))->pluck('name')->all();

        return (new Collection($childMethods))
                    ->filter(fn ($action) => !in_array($action, $parentMethods))
                    ->values()
                    ->all();
    }

    private function componentProperties(): array
    {
        $childProperties  = new ReflectionClass(get_called_class());
        $childProperties  = $childProperties->getProperties(ReflectionProperty::IS_PUBLIC);
        $childProperties  = (new Collection($childProperties))->pluck('name')->all();
        
        $parentProperties = new ReflectionClass(Component::class);
        $parentProperties = $parentProperties->getProperties(ReflectionProperty::IS_PUBLIC);
        $parentProperties = (new Collection($parentProperties))->pluck('name')->all();

        return (new Collection($childProperties))
                    ->filter(fn ($property) => !in_array($property, $parentProperties))
                    ->all();
    }

    private function componentState(): array
    {
        $properties = $this->componentProperties();

        return (new Collection($properties))
                    ->map(fn ($property) => [$property => $this->$property])
                    ->collapse()
                    ->all();
    }

    private function componentData(array $data = null): array
    {
        return ['component' => array_merge([
            'name'    => $this->componentName(),
            'route'   => "/{$this->request->path()}",
            'actions' => $this->componentActions(),
            'errors'  => $this->errors,
        ], $data)];

    }

    private function componentName(): string
    {
        $name = get_called_class();
        $name = Str::remove('App\\Http\\Inertia', $name);
        $name = Str::replace('\\', ' ', $name);
        $name = Str::snake($name, '.');

        return $name;
    }
}