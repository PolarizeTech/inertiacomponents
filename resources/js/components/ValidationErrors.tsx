import React, { PropsWithChildren } from 'react'

export function ValidationErrors({ errors }) {
  return Object.keys(errors).length > 0 && (
    <div className="pb-2 space-y-3">
      {Object.keys(errors).map((key, index) => (
        <Error key={`${index}_${key}`} text={errors[key]} />
      ))}
    </div>
  )
}

interface Props {
  text?: string
  className: string
}

export function Error({ text, className = '', children, ...props }: PropsWithChildren<Props>) {
  return (
    <div className={`${className} text-sm text-red-400`} {...props}>{text}{children}</div>
  )
}