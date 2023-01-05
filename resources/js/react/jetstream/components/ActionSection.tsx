import React, { PropsWithChildren } from '@pckg/preact/compat'
import SectionTitle from '@ja-inertia/react/jetstream/components/SectionTitle'
import { Card } from '@blazervel-ui/components'

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
