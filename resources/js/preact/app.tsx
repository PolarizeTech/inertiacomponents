import { render } from '@pckg/preact/compat'
import { createInertiaApp } from '@pckg/@inertiajs/inertia-react'
import { InertiaProgress } from '@pckg/@inertiajs/progress'
import { resolvePage } from '../'
import '../../css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'Blazervel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePage(name, 'jsx'),
  setup({ el, App, props }) {
    return render(<App {...props} />, el)
  },
})

InertiaProgress.init({ color: '#4B5563' })