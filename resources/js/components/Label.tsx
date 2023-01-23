import React, { PropsWithChildren } from 'react'

interface Props {
  htmlFor?: string
  text?: string
  value?: string
  className?: string
}

export function Label({
  htmlFor = null,
  text = '',
  value = '',
  className = '',
  children
}: PropsWithChildren<Props>) {
  return(
    <label htmlFor={htmlFor} className={`block font-medium text-sm text-chrome-700 dark:text-chrome-400 ` + className}>
      {text}{value}{children}
    </label>
  )
}