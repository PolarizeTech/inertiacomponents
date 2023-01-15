## Tools for making great SaaS apps with Inertia.js + Laravel

```
composer require joshuaanderton/inertia
```

Import component JS and CSS dependencies:
```
// ./vite.config.ts
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import preact from '@preact/preset-vite'
import jaInertia from './vendor/joshuaanderton/inertia'

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/js/app.js',
        'resources/js/widget.js',
      ],
      refresh: true,
    }),
    preact(),
    jaInertia({progress: {color: '#4B5563'}}),
  ]
})
```

Include package views in tailwind config:
```
// ./tailwind.config.js

module.exports = {
	content: [
		'./resources/views/**/*.blade.php',
    './vendor/joshuaanderton/inertia/**/*.{ts,tsx}',
	],
  ...
```

### TSX Components
Tons of reuseable & extendible components (via TailwindCSS).

#### Icons (via [tailwindlabs/heroicons](https://github.com/tailwindlabs/heroicons))
```
import { Icon } from '@ja-inertia/components'

<Icon name="bug-ant" />
```

#### Buttons
```
<Button
  route={['products.show', {product: product.slug}]}  // Route uri is retrieved (if exists) and rendered as href="" attribute
  text={lang('products.view_product')}                // Text attribute translated (if translation exists)
  icon="cart"                                         // Icon component utilized within
  lg />

// Slot supported too of course!
<blade:button href="products">View Products</blade:button>
```
