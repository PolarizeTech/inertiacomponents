import React from 'react'
import APITokenManager from '@ja-inertia/vendor/jetstream/Pages/API/Partials/APITokenManager'
import { ApiToken } from '@ja-inertia/types'
import { AppLayout } from '@ja-inertia/components'

interface Props {
  tokens: ApiToken[]
  availablePermissions: string[]
  defaultPermissions: string[]
}

export default function ApiTokenIndex({
  tokens,
  availablePermissions,
  defaultPermissions,
}: Props) {
  return (
    <AppLayout title={'API Tokens'}>
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <APITokenManager
            tokens={tokens}
            availablePermissions={availablePermissions}
            defaultPermissions={defaultPermissions}
          />
        </div>
      </div>
    </AppLayout>
  )
}
