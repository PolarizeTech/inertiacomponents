import React from 'react'
import { AppLayout } from '@ja-inertia/components'
import CreateTeamForm from '@ja-inertia/vendor/jetstream/Pages/Teams/Partials/CreateTeamForm'

export default () => {
  return (
    <AppLayout
      title="Create Team"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Create Team
        </h2>
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <CreateTeamForm />
        </div>
      </div>
    </AppLayout>
  );
}
