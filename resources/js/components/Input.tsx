import React, { PropsWithChildren, useRef, useState, useEffect } from 'react'
import { Label, Icon, LoadingIcon } from '.'
import { mergeCssClasses } from '../utils/css-classes'

export default ({
  xs = false,
  sm = false,
  md = false,
  lg = false,
  type = 'text',
  className = '',
  colorClassName = '',
  name,
  id = '',
  label = null,
  value,
  autoComplete,
  required,
  handleChange = () => {},
  isFocused,
  processing = false,
  prepend = null,
  ...props
}: PropsWithChildren<object>) => {

  id = id || name

  const hasLabel = label !== null && label.length

  let size = (xs && 'xs') || (sm && 'sm') || (md && 'md') || (lg && 'lg') || 'base',
      sizeClassNames = {
        xs:   [],
        sm:   [],
        base: [],
        md:   [],
        lg:   [],
      }
  
  if (!colorClassName) {
    colorClassName = [
      'text-chrome-700',
      'bg-chrome-50',
      'border-chrome-200',
      'placeholder:text-chrome-400',
      'dark:text-white',
      'dark:bg-chrome-800',
      'dark:border-chrome-700',
      'dark:placeholder:text-chrome-600',
    ]
  }

  className = mergeCssClasses(
    className, 
    sizeClassNames[size], 
    colorClassName,
    [
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',

      'focus:border-chrome-200',
      'focus:ring',
      'focus:ring-theme-200',
      'focus:ring-opacity-50',
      
      'rounded-md',
      'transition-colors',
      'transition-opacity',
    ],
  )
  
  if (hasLabel && !prepend) {
    className+= ' mt-1'
  }

  const [inputPaddingLeft, setInputPaddingLeft] = useState(null)

  const inputEl = useRef(),
        prependEl = useRef(),
        clear = () => {
          inputEl.current.value = value = null
          handleChange({target: inputEl.current})
        },
        PrependElement = () => (
          <div
            ref={prependEl}
            type="button"
            className="absolute top-0 text-chrome-500 h-full z-10 left-0 text-left inline-flex items-center pointer-events-none pl-3.5 whitespace-nowrap"
          >
            {prepend}
          </div>
        )

  useEffect(() => {
    if (isFocused) {
      inputEl.current.focus()
    }

    if (prepend) {
      setInputPaddingLeft(`${prependEl.current.offsetWidth}px`)
    }
  }, [])

  return (
    <div className="flex flex-col items-start relative">
      
      {hasLabel && (
        <Label htmlFor={id} text={label} />
      )}

      <div className={`relative w-full ${hasLabel ? 'mt-1' : ''}`}>
        
        {prepend && <PrependElement />}

        <input
          type={type}
          name={name}
          value={value || ''}
          className={className}
          style={{paddingLeft: inputPaddingLeft}}
          autoComplete={autoComplete}
          required={required}
          ref={inputEl}
          onChange={(event) => handleChange(event)}
          {...props}
        />
        
      </div>

      {/* {processing && (
        <span className="absolute bottom-2 right-4">
          <LoadingIcon />
        </span>
      )} */}

      {(value || '').length > 0 && !processing && (
        <button type="button" onClick={clear} className="absolute bottom-2 right-4 p-0 border-none focus:ring-transparent">
          <Icon name="times-circle" lg className="text-chrome-300 dark:text-chrome-600" />
        </button>
      )}

    </div>
  )
}

export const InputFile = ({ className = '', wrapperClassName = '', progress, handleChange, ...props }) => (
  <div className={wrapperClassName}>

    <input
      type="file"
      className={`${className} text-chrome-500`}
      onChange={handleChange}
      {...props} />

    {progress && (
      <progress value={progress.percentage} max="100">
        {progress.percentage}%
      </progress>
    )}

  </div>
)