import { render } from '@pckg/preact'
import _ from '@pckg/lodash'
import { createInertiaApp } from '@pckg/@inertiajs/inertia-react'
import { InertiaProgress } from '@pckg/@inertiajs/progress'
import initTranslations from '../utils/translations'
import initRoutes from '../utils/routes'

import '@blazervel/../css/tailwind.css'

createInertiaApp({
  resolve: name => import(name),
  setup: ({ el, App, props }) => {

    initTranslations(_.get(props, 'initialPage.props.jaInertia.localization', null))
    initRoutes(_.get(props, 'initialPage.props.jaInertia.routes', null))
    
    return render(<App {...props} />, el)

  }
})

InertiaProgress.init({ color: '#4B5563' })