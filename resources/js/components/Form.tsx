import React, { PropsWithChildren } from 'react'
import { useForm } from '@pckg/@inertiajs/react'
import {
  ButtonPrimary,
  Input,
  InputFile,
  Select,
  Label,
  Combobox,
  Checkbox,
  Textarea,
  ValidationErrors,
  Toggle
} from '.'

interface Props {
  action?: string
  route?: string|Array<string|object>
  method: string
  submitData?: Function
  clearOnSuccess: boolean
  clearOnError: boolean
}

export default function ({
  action,
  route,
  method = 'POST',
  submitData,
  clearOnSuccess = false,
  clearOnError = false,
  children,
  ...props
}: PropsWithChildren<Props>) {

  const routeMethod = window?.route || null

  if (!action && route && routeMethod !== null) {
    if (Array.isArray(route)) {
      const [key, params] = route
      action = routeMethod(key, params)
    } else {
      action = routeMethod(route)
    }
  }

  let initialValues = {}

  // Base form component can take fields Array<object>
  if (props.fields) {
    props.fields.map(field => initialValues[field.name] = field.value || null)
  }

  const {
    data,
    setData,
    post,
    put,
    delete: destroy,
    processing,
    progress,
    errors,
    reset,
    clearErrors
  } = useForm(initialValues)
  
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

    if (clearOnError === true && errors) {
      reset()
    }

    if (typeof submitData === 'function') {
      const mergedData = submitData(data)

      Object.entries(mergedData).map(([key, value]) => setData(key, value))
    }

    if (method.toLowerCase() === 'put') {
      put(action, options)
    } else if (method.toLowerCase() === 'delete') {
      destroy(action, options)
    } else {
      post(action, options)
    }
  }

  const change = (name, value) => {
    clearErrors(name)
    setData(name, value)
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

interface ThemeProps {
  submitButton?: Function|boolean
}

export const FormTheme = ({
  handleSubmit,
  handleChange,
  fieldValues = {},
  fields = [],
  processing,
  submitButton,
  tight,
  className,
  children,
  ...props
}: PropsWithChildren<ThemeProps>) => {

  return (
    <form onSubmit={handleSubmit} className={`${className} block relative`} {...props}>

      <div className={tight === true ? 'space-y-3' : 'space-y-6'}>
          
        {fields.map(({
          type,
          name,
          autofocus,
          disabled,
          prepend,
          ...props
        }, fieldIndex) => {

          props.value = fieldValues[name] || null

          const id = `${name}-${(new Date).getTime() + fieldIndex}`

          return (

            <div key={name}>

              {props.label && ['file', 'combobox', 'select', 'custom'].includes(type) && (
                <Label htmlFor={name} value={props.label} />
              )}

              {type === 'select' && (

                <Select
                  name={name}
                  className="w-full"
                  isFocused={autofocus}
                  handleChange={event => handleChange(name, event.target.value)}
                  disabled={disabled || processing}
                  {...props} />

              )}

              {type === 'textarea' && (

                <Textarea
                  name={name}
                  className="w-full"
                  isFocused={autofocus}
                  handleChange={event => handleChange(name, event.target.value)}
                  disabled={disabled || processing}
                  {...props} />

              )}

              {type === 'checkbox' && (

                <Checkbox
                  id={id}
                  name={name}
                  checked={props.value}
                  handleChange={event => handleChange(name, event.target.checked)}
                  disabled={disabled || processing}
                  {...props} />

              )}

              {type === 'toggle' && (

                <Toggle
                  name={name}
                  handleChange={value => handleChange(name, value)}
                  disabled={disabled || processing}
                  {...props} />

              )}

              {['text', 'password', 'number', 'email', 'date', 'youtube_url'].includes(type || 'text') && (

                <Input
                  name={name}
                  type={type === 'youtube_url' ? 'text' : type}
                  autoComplete={['name', 'first_name', 'last_name', 'email', 'password'].includes(name) ? name : null}
                  className="w-full"
                  isFocused={autofocus}
                  handleChange={event => handleChange(name, event.target.value)}
                  disabled={disabled || processing}
                  processing={processing}
                  prepend={prepend}
                  {...props} />

              )}

              {type === 'file' && (

                <InputFile
                  name={name}
                  disabled={disabled || processing}
                  handleChange={event => handleChange(name, event.target.files[0])}
                  processing={processing}
                  {...props} />

              )}
              
              {type === 'youtube_url' && (props.value || '').includes('youtube.com/embed/') && (

                <div className="max-w-xs">
                  <div className="mt-3 relative w-full h-0 pb-[57%]">
                    <iframe
                      className="rounded-md absolute inset-0 h-full w-full pointer-events-none"
                      src={props.value}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen></iframe>
                  </div>
                </div>

              )}

              {type === 'custom' && (
                <props.component
                  name={name}
                  disabled={disabled || processing}
                  handleChange={value => handleChange(name, value)}
                  processing={processing}
                  {...props} />
              )} 

            </div>

          )
        })}

        {children}
      
      </div>

      {submitButton !== false && (
        <div className="mt-6 flex justify-end">
          {typeof submitButton === 'function' ? (
            submitButton()
          ) : (
            <ButtonPrimary type="submit" className="ml-4" disabled={processing} text="Submit" />
          )}
        </div>
      )}

    </form>
  )
}