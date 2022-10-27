import { resolvePage } from '../'
import { ReactDOMServer } from '@appModules/preact-compat'
import { createInertiaApp } from '@appModules/@inertiajs/inertia-react'
import createServer from '@appModules/@inertiajs/server'
import '../../css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'Blazervel'

createServer((page) => createInertiaApp({
  page,
  render: ReactDOMServer.renderToString,
  resolve: name => resolvePage(name, 'jsx'),
  setup: ({ App, props }) => <App {...props} />,
}))