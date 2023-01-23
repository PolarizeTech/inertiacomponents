import React, { PropsWithChildren, useRef, useState, useEffect } from 'react'
import { Label, Icon } from '.'
import { mergeCssClasses } from '../utils/css-classes'

interface Props {
  name: string
  id?: string
  value?: string
  label?: string
  placeholder?: string
  className?: string
  handleChange?: Function
  fresh?: boolean
  xs?: boolean
  sm?: boolean
  md?: boolean
  lg?: boolean
  autoComplete?: boolean
  autoresize?: boolean
  autoresizeEmptyHeight?: number
  required?: boolean
  isFocused?: boolean
  disabled?: boolean
}

export default function ({
  className = '',
  id = '',
  name,
  label = null,
  placeholder = null,
  value,
  fresh = false,
  xs = false,
  sm = false,
  md = false,
  lg = false,
  required,
  handleChange,
  isFocused = false,
  autoresize = false,
  autoresizeEmptyHeight = 60,
  autoComplete,
  processing = false,
  disabled = false,
  ...props
}: PropsWithChildren<Props>) {

  if (!id) {
    id = name
  }

  const hasLabel = label !== null && label.length

  let size = (xs && 'xs') || (sm && 'sm') || (md && 'md') || (lg && 'lg') || 'base',
      sizeClassNames = {
        xs:   [],
        sm:   [],
        base: [],
        md:   [],
        lg:   [],
      },
      colorClassNames = [
        'text-chrome-700',
        'placeholder:text-chrome-400',
        'dark:text-white',
        'dark:placeholder:text-chrome-600',
      ]

  className = mergeCssClasses(
    className, 
    sizeClassNames[size], 
    colorClassNames,
    [
      'transition-colors',
      'transition-opacity',
      'border-transparent',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'bg-transparent',
      'border-0',
      'outline-none',
      'focus:ring-transparent',
      'mb-0',
    ],
    {
      'mt-1': hasLabel,
      'opacity-50': disabled,
      'overflow-hidden': autoresize,
    }
  )

  const textareaEl = useRef(),
        textareaEmptyHeight = autoresizeEmptyHeight,
        [inputHeight, setInputHeight] = useState(textareaEmptyHeight),
        handleAutoResize = (event) => {
          setInputHeight(textareaEmptyHeight)

          setTimeout(() => (
            setInputHeight(
              event.target.scrollHeight > textareaEmptyHeight
                ? event.target.scrollHeight
                : textareaEmptyHeight
            )
          ), 1)
        }

  useEffect(() => {
    if (isFocused) {
      textareaEl.current.focus()
    }
  }, [])

  return (
    <div className="flex flex-col items-start relative">
      
      {hasLabel && (
        <Label htmlFor={id} text={label} />
      )}

      <div
        className={mergeCssClasses(
          [
            'bg-chrome-50',
            'focus-within:border-theme-300',
            'focus-within:ring',
            'focus-within:ring-theme-200',
            'focus-within:ring-opacity-50',
            'rounded-md',
            'relative',
            'w-full',
            'border-chrome-100',
            'dark:bg-chrome-800',
            'dark:border-chrome-700',
            'min-h-0',
          ],
          {
            'mt-1': hasLabel,
            'overflow-hidden': autoresize,
            'transition-all': autoresize,
            'duration-300': autoresize,
          }
        )}
        style={{
          minHeight: (
            autoresize
              ? `${inputHeight}px`
              : undefined
          )
        }}
      >
        
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          onInput={autoresize ? handleAutoResize : null}
          style={autoresize ? {height: `${inputHeight}px`} : null}
          className={className}
          autoComplete={autoComplete}
          required={required}
          onChange={handleChange}
          disabled={disabled || processing}
          value={value || ''}
          {...props}
        />
        
      </div>

      {processing && (
        <span className="absolute bottom-2 right-4">
          <Icon name='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fill-theme-400 spin"><defs><style>.fa-secondary{opacity:.4}</style></defs><path class="fa-primary" d="M256 32C256 14.33 270.3 0 288 0C429.4 0 544 114.6 544 256C544 302.6 531.5 346.4 509.7 384C500.9 399.3 481.3 404.6 465.1 395.7C450.7 386.9 445.5 367.3 454.3 351.1C470.6 323.8 480 291 480 255.1C480 149.1 394 63.1 288 63.1C270.3 63.1 256 49.67 256 31.1V32z"/><path class="fa-secondary" d="M287.1 64C181.1 64 95.1 149.1 95.1 256C95.1 362 181.1 448 287.1 448C358.1 448 419.3 410.5 452.9 354.4L453 354.5C446.1 369.4 451.5 387.3 465.1 395.7C481.3 404.6 500.9 399.3 509.7 384C509.9 383.7 510.1 383.4 510.2 383.1C466.1 460.1 383.1 512 288 512C146.6 512 32 397.4 32 256C32 114.6 146.6 0 288 0C270.3 0 256 14.33 256 32C256 49.67 270.3 64 288 64H287.1z"/></svg>' lg className="text-chrome-300 dark:text-chrome-600" spin />
        </span>
      )}

    </div>
  )
}