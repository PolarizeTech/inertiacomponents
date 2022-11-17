<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark:bg-chrome-900">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'Blazervel') }}</title>
    @vite('resources/js/app.js')
    @inertiaHead
  </head>
  <body class="font-sans antialiased">
    @inertia
  </body>
</html>