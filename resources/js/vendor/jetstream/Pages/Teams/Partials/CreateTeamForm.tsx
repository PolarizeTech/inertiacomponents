import { useForm } from '@pckg/@inertiajs/react';
import React from 'react';
import { useTypedPage } from '@ja-inertia/utils';
import ActionMessage from '@ja-inertia/vendor/jetstream/components/ActionMessage';
import FormSection from '@ja-inertia/vendor/jetstream/components/FormSection';
import InputError from '@ja-inertia/vendor/jetstream/components/InputError';
import InputLabel from '@ja-inertia/vendor/jetstream/components/InputLabel';
import PrimaryButton from '@ja-inertia/vendor/jetstream/components/PrimaryButton';
import TextInput from '@ja-inertia/vendor/jetstream/components/TextInput';
import { mergeCssClasses } from '@ja-inertia/utils';

export default () => {
  
  const page = useTypedPage();
  const form = useForm({
    name: '',
  });

  function createTeam() {
    form.post(route('teams.store'), {
      errorBag: 'createTeam',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={createTeam}
      title={'Team Details'}
      description={'Create a new team to collaborate with others on projects.'}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>

          <PrimaryButton
            type="submit"
            className={mergeCssClasses({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Save
          </PrimaryButton>
        </>
      )}
    >
      <div className="col-span-6">
        <InputLabel value="Team Owner" />

        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={page.props.user.profilePhotoUrl}
            alt={page.props.user.name}
          />

          <div className="ml-4 leading-tight">
            <div>{page.props.user.name}</div>
            <div className="text-gray-700 text-sm">{page.props.user.email}</div>
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
          autoFocus
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>
    </FormSection>
  );
}
