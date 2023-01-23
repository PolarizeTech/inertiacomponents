import React, { PropsWithChildren } from 'react'
import SectionTitle from '@ja-inertia/vendor/jetstream/components/SectionTitle'
import { Card } from '@ja-inertia/components'

interface Props {
  title: string
  description: string
}

export default function ActionSection({
  title,
  description,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col space-y-6">
      <SectionTitle title={title} description={description} />
      <Card>
        {children}
      </Card>
    </div>
  )
}
