
import ActionMessage from '@ja-inertia/vendor/jetstream/components/ActionMessage'
import FormSection from '@ja-inertia/vendor/jetstream/components/FormSection'
import InputError from '@ja-inertia/vendor/jetstream/components/InputError'
import InputLabel from '@ja-inertia/vendor/jetstream/components/InputLabel'
import PrimaryButton from '@ja-inertia/vendor/jetstream/components/PrimaryButton'
import TextInput from '@ja-inertia/vendor/jetstream/components/TextInput';
import { JetstreamTeamPermissions, Team, User } from '@ja-inertia/types';
import { useForm } from '@pckg/@inertiajs/react';
import { mergeCssClasses as classNames } from '@ja-inertia/utils';
import React from 'react';

interface Props {
  team: Team & { owner: User };
  permissions: JetstreamTeamPermissions;
}

export default ({ team, permissions }: Props) => {
  
  const form = useForm({
    name: team.name,
  })

  function updateTeamName() {
    form.put(route('teams.update', [team]), {
      errorBag: 'updateTeamName',
      preserveScroll: true,
    })
  }

  return (
    <FormSection
      onSubmit={updateTeamName}
      title={'Team Details'}
      description={`The team's name, owner, and other information.`}
      renderActions={
        permissions.canUpdateTeam
          ? () => (
              <>
                <ActionMessage on={form.recentlySuccessful} className="mr-3">
                  Saved.
                </ActionMessage>

                <PrimaryButton
                  type="submit"
                  className={classNames({ 'opacity-25': form.processing })}
                  disabled={form.processing}
                >
                  Save
                </PrimaryButton>
              </>
            )
          : undefined
      }
    >
      <div className="col-span-6">
        <InputLabel value="Team Owner" />

        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={team.owner.profile_photo_url}
            alt={team.owner.name}
          />

          <div className="ml-4 leading-tight">
            <div>{team.owner.name}</div>
            <div className="text-gray-700 text-sm">{team.owner.email}</div>
          </div>
        </div>
      </div>

      <div>
        <InputLabel htmlFor="name" value="Team Name" />

        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          disabled={!permissions.canUpdateTeam}
        />

        <InputError message={form.errors.name} className="mt-2" />
      </div>
    </FormSection>
  )
}
