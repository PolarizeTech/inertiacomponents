import { createInertiaApp } from '@pckg/@inertiajs/react'
import createServer from '@pckg/@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import { resolvePage } from '../utils'

createServer(page =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: resolvePage,
    setup: ({ App, props }) => <App {...props} />,
  })
)