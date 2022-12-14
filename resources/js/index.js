
import { Inertia } from '@pckg/@inertiajs/inertia'
import { usePage } from '@pckg/@inertiajs/inertia-react'

export const useComponent = () => {

  const { component } = usePage().props

  return (
    new Proxy({
      call: (action, parameters) => (
        Inertia.post(
          `inertia-components/${component.state.componentName}/actions/${action}/call`,
          {state: component.state, parameters: parameters},
          {preserveState: true}
        )
      ),
      errors: component.errors,
      ...component.state
    }, {
      get: (target, prop, receiver) => (
        !component.actions.includes(prop)
          ? target[prop]
          : (...parameters) => target.call(prop, parameters)
      )
    })
  )
}

export { default as lang } from './utils/translations'
export { resolvePage } from './utils/pages'