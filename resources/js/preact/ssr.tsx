import { resolvePage } from '../'
import { ReactDOMServer } from '@pckg/preact-compat'
import { createInertiaApp } from '@pckg/@inertiajs/inertia-react'
import createServer from '@pckg/@inertiajs/server'
import '../../css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'Blazervel'

createServer((page) => createInertiaApp({
  page,
  render: ReactDOMServer.renderToString,
  resolve: name => resolvePage(name, 'jsx'),
  setup: ({ App, props }) => <App {...props} />,
}))