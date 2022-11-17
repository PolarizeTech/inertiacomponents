import { useForm } from '@pckg/@inertiajs/inertia-react'
import {
  FormTheme,
  ValidationErrors
} from '@blazervel-ui/components'

export default function ({
  route,
  method = 'POST',
  submitData,
  clearOnSuccess,
  clearOnError,
  children,
  ...props
}) {
  let initialValues = {}

  // Base form component can take fields Array<object>
  if (props.fields) {
    props.fields.map(field => initialValues[field.name] = field.value || null)
  }

  const { data, setData, post, put, delete: destroy, processing, progress, errors } = useForm(initialValues)
  
  const clear = event => {
    let clearValues = {}
      
    props.fields.map(field => clearValues[field.name] = null)

    setData(clearValues)
  }

  const submit = e => {
    e.preventDefault()

    const options = {
      preserveScroll: true
    }

    if (clearOnSuccess === true) {
      options.onSuccess = clear
    }

    if (clearOnError === true) {
      options.onSuccess = clear
    }

    if (typeof submitData === 'function') {
      const mergedData = submitData(data)

      Object.entries(mergedData).map(([key, value]) => setData(key, value))
    }

    if (method.toLowerCase() === 'put') {
      put(route, options)
    } else if (method.toLowerCase() === 'delete') {
      destroy(route, options)
    } else {
      post(route, options)
    }
  }

  const change = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value)
  }

  return (
    <FormTheme
      handleSubmit={submit}
      handleChange={change}
      fieldValues={data}
      processing={processing}
      {...props}
    >
      <ValidationErrors errors={errors} />
      {children}
    </FormTheme>
  )
}