import { useForm } from '@appModules/@inertiajs/inertia-react'
import { Icon, ValidationErrors } from '@blazervel/ui/components'
import { Link } from '.'

export default function ({
  children,
  route = '',
  data = {},
  only = [],
  method = 'GET',
  ...props
}) {

  const isAbsoluteRoute = route && route.indexOf('http') === 0

  if (!route.length) {
    return (
      <button {...props}>{children}</button>
    )
  }

  if (method === 'GET') {

    if (isAbsoluteRoute) {
      return (
        <a href={route} {...props}>{children}</a>
      )
    }

    return (
      <Link href={route} {...props}>{children}</Link>
    )

  }

  const { post, put, delete: destroy, setData, processing, errors } = useForm(data)

  const submit = (e) => {
    e.preventDefault()

    let options = {
      preserveScroll: true,
      preserveState: true
    }

    // if (only.length) {
    //   options.only = only
    //   options.replace = true
    // }

    method = method.toLowerCase()

    if (method === 'delete') {
      destroy(route, options)
    } else if (method === 'put') {
      put(route, options)
    } else {
      post(route, options)
    }
  }

  props.type = 'submit'

  return (
    <form onSubmit={submit}>
      <ValidationErrors errors={errors} />
      <button disabled={props.disabled || processing} {...props}>
        {!processing ? children : (
          <span class="inline-flex items-center space-x-1">
            <span>{children}</span>
            <Icon name="spinner-third" sm fw spin />
          </span>
        )}
      </button>
    </form>
  )
}