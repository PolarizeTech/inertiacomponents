
import ActionSection from '@ja-inertia/react/jetstream/components/ActionSection';
import ConfirmationModal from '@ja-inertia/react/jetstream/components/ConfirmationModal';
import DangerButton from '@ja-inertia/react/jetstream/components/DangerButton';
import SecondaryButton from '@ja-inertia/react/jetstream/components/SecondaryButton';
import { Team } from '@ja-inertia/react/jetstream/types';
import { useForm } from '@pckg/@inertiajs/inertia-react';
import { mergeCssClasses as classNames } from '@blazervel-ui/utils';
import React, { useState } from '@pckg/preact/compat';

interface Props {
  team: Team;
}

export default ({ team }: Props) => {
  //const route = useRoute();
  const [confirmingTeamDeletion, setConfirmingTeamDeletion] = useState(false);
  const form = useForm({});

  function confirmTeamDeletion() {
    setConfirmingTeamDeletion(true);
  }

  function deleteTeam() {
    form.delete(route('teams.destroy', [team]), {
      errorBag: 'deleteTeam',
    });
  }

  return (
    <ActionSection
      title={'Delete Team'}
      description={'Permanently delete this team.'}
    >
      <div className="max-w-xl text-sm text-gray-600">
        Once a team is deleted, all of its resources and data will be
        permanently deleted. Before deleting this team, please download any data
        or information regarding this team that you wish to retain.
      </div>

      <div className="mt-5">
        <DangerButton onClick={confirmTeamDeletion}>
          Delete Team
        </DangerButton>
      </div>

      {/* <!-- Delete Team Confirmation Modal --> */}
      <ConfirmationModal
        isOpen={confirmingTeamDeletion}
        onClose={() => setConfirmingTeamDeletion(false)}
      >
        <ConfirmationModal.Content title={'Delete Team'}>
          Are you sure you want to delete this team? Once a team is deleted, all
          of its resources and data will be permanently deleted.
        </ConfirmationModal.Content>

        <ConfirmationModal.Footer>
          <SecondaryButton onClick={() => setConfirmingTeamDeletion(false)}>
            Cancel
          </SecondaryButton>

          <DangerButton
            onClick={deleteTeam}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Delete Team
          </DangerButton>
        </ConfirmationModal.Footer>
      </ConfirmationModal>
    </ActionSection>
  );
}
