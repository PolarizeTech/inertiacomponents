import React, { PropsWithChildren } from 'react'

interface Props {
  htmlFor?: string
  text?: string
  value?: string
  asSpan?: boolean
  className?: string
}

export function Label({
  htmlFor = null,
  text = '',
  value = '',
  className = '',
  asSpan,
  children
}: PropsWithChildren<Props>) {
  
  className = `block font-medium text-sm text-chrome-700 dark:text-chrome-400 ${className}`

  if (asSpan === true) {
    return(
      <label className={className}>
        {text}{value}{children}
      </label>
    )
  }
  return(
    <label htmlFor={htmlFor} className={className}>
      {text}{value}{children}
    </label>
  )
}