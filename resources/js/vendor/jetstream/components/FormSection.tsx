import { mergeCssClasses as classNames } from '@ja-inertia/utils'
import React, { PropsWithChildren } from 'react'
import SectionTitle from '@ja-inertia/vendor/jetstream/components/SectionTitle'
import { Card } from '@ja-inertia/components'

interface Props {
  title: string
  description: string
  renderActions?(): JSX.Element
  onSubmit(): void
}

export default function FormSection({
  onSubmit,
  renderActions,
  title,
  description,
  children,
}: PropsWithChildren<Props>) {
  const hasActions = !!renderActions

  return (
    <div className="flex flex-col space-y-6">
      <SectionTitle title={title} description={description} />

      <form
        onSubmit={event => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <Card>
          <div className="space-y-6">
            {children}
          </div>

          {hasActions && (
            <div className="pt-6 flex items-center justify-end">
              {renderActions?.()}
            </div>
          )}

        </Card>
      </form>
    </div>
  )
}
