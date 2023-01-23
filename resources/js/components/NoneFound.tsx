import React, { PropsWithChildren } from 'react'
import { Button } from '.'

export function NoneFound({ text, buttonRoute, buttonText, buttonMethod = 'GET', children, ...props }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 py-12 border-2 rounded-xl border-dashed border-chrome-200 dark:border-chrome-600" {...props}>
      
      {(text || (!text && !buttonRoute)) && (
        <span className="text-chrome-500 font-medium text-sm">
          {text || 'None yet...'}
        </span>
      )}
      
      {children}

      {buttonRoute && (
        <Button
          route={buttonRoute}
          icon="plus"
          text={buttonText || 'Create New'}
          method={buttonMethod}
          outline
          sm />
      )}

    </div>
  )
}