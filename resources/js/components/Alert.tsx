import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '.'

interface AlertTheme {
  name: string
  wrapper: string
  text: string
  button: string
  icon: string
  IconComponent: Function
}

const THEMES: Array<AlertTheme> = [
  {
    name: 'message',
    wrapper: 'bg-chrome-100',
    text: 'text-chrome-800',
    button: 'bg-chrome-50 text-chrome-500 hover:bg-chrome-100 focus:ring-offset-chrome-50 focus:ring-chrome-600',
    icon: 'text-chrome-400',
    IconComponent: ({ className }) => <Icon name="information-circle" className={className} fw />,
  },
  {
    name: 'warning',
    wrapper: 'bg-yellow-50',
    text: 'text-yellow-800',
    button: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-offset-yellow-50 focus:ring-yellow-600',
    icon: 'text-yellow-400',
    IconComponent: ({ className }) => <Icon name="information-circle" className={className} fw />,
  },
  {
    name: 'success',
    wrapper: 'bg-green-50',
    text: 'text-green-800',
    button: 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600',
    icon: 'text-green-400',
    IconComponent: ({ className }) => <Icon name="check-circle" className={className} fw />,
  },
  {
    name: 'error',
    wrapper: 'bg-red-50',
    text: 'text-red-800',
    button: 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600',
    icon: 'text-red-400',
    IconComponent: ({ className }) => <Icon name="exclamation-circle" className={className} fw />,
  },
]

interface Props {
  type: string
  text: string
  sm: boolean
  persist: boolean
  dismissible: boolean
  className: string
}

export function Alert({
  type = 'message',
  text,
  sm = false,
  persist = false,
  dismissible = true,
  className = '',
  ...props
}: Props) {

  if (!Object.keys(THEMES).includes(type)) {
    return <></>
  }

  const [visible, setVisible] = useState(true),
        [closed, setClosed] = useState(false),
        theme: AlertTheme = THEMES.filter(theme => theme.name === type)[0],
        AlertIcon = theme.IconComponent,
        durationCssClass = 'duration-300',
        close = () => {
          setVisible(false)
          setTimeout(() => setClosed(true), parseInt(durationCssClass.split('-')[1]))
        }

  if (!persist) {
    setTimeout(close, 1500)
  }

  if (closed) {
    return <></>
  }

  className+= [
    durationCssClass,
    theme.wrapper,
    visible ? 'opacity-80' : 'opacity-0',
    sm ? 'px-2 py-1.5' : 'px-4 py-3',
    'transition-opacity rounded-md'
  ].join(' ')

  return (
    <div className={className} {...props}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertIcon className={`${theme.icon} relative -top-0.5`} />
        </div>
        <div className="ml-2">
          <p className={`${theme.text} text-sm font-medium`}>
            {text}
          </p>
        </div>
        {persist && dismissible && (
          <div className="ml-auto pl-4">
            <div className={!sm ? '-mx-1.5 -my-1.5' : ''}>
              <button
                type="button"
                onClick={close}
                className={`${theme.button} inline-flex rounded-md ${sm ? 'p-0.5' : 'p-1.5'} focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                <span className="sr-only">Dismiss</span>
                <i className="fa fa-fw fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}