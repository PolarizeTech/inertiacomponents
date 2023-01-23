import { render, createElement } from 'react'
import { createInertiaApp } from '@pckg/@inertiajs/react'
import _ from '@pckg/lodash'
import initTranslations from './translations'
import initRoutes from './routes'
import { resolvePage } from '../utils'

export default () => (
  createInertiaApp({
    resolve: resolvePage,
    setup({ el, App, props }) {
      initTranslations(_.get(props, 'initialPage.props.jaInertia.translations', null))
      initRoutes(_.get(props, 'initialPage.props.jaInertia.routes', null))
      render(createElement(App, props), el || document.body)
    },
    progress: JA_INERTIA_OPTIONS.progress
  })
)