import { useForm } from '@pckg/@inertiajs/react';
import { mergeCssClasses as classNames } from '@ja-inertia/utils';
import React, { useRef } from 'react';

import ActionMessage from '@ja-inertia/vendor/jetstream/components/ActionMessage';
import FormSection from '@ja-inertia/vendor/jetstream/components/FormSection';
import InputError from '@ja-inertia/vendor/jetstream/components/InputError';
import InputLabel from '@ja-inertia/vendor/jetstream/components/InputLabel';
import { Input, ButtonPrimary } from '@ja-inertia/components'

export default function UpdatePasswordForm() {
  //const route = useRoute();
  const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);

  function updatePassword() {
    form.put(route('user-password.update'), {
      errorBag: 'updatePassword',
      preserveScroll: true,
      onSuccess: () => form.reset(),
      onError: () => {
        if (form.errors.password) {
          form.reset('password', 'password_confirmation');
          passwordRef.current?.focus();
        }

        if (form.errors.current_password) {
          form.reset('current_password');
          currentPasswordRef.current?.focus();
        }
      },
    });
  }

  return (
    <FormSection
      onSubmit={updatePassword}
      title={'Update Password'}
      description={
        'Ensure your account is using a long, random password to stay secure.'
      }
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>

          <ButtonPrimary
            type="submit"
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Save
          </ButtonPrimary>
        </>
      )}
    >
      <div>
        <InputLabel htmlFor="current_password">Current Password</InputLabel>
        <Input
          id="current_password"
          type="password"
          className="mt-1 block w-full"
          ref={currentPasswordRef}
          value={form.data.current_password}
          onChange={e =>
            form.setData('current_password', e.currentTarget.value)
          }
          autoComplete="current-password"
        />
        <InputError
          message={form.errors.current_password}
          className="mt-2"
        />
      </div>

      <div>
        <InputLabel htmlFor="password">New Password</InputLabel>
        <Input
          id="password"
          type="password"
          className="mt-1 block w-full"
          value={form.data.password}
          onChange={e => form.setData('password', e.currentTarget.value)}
          autoComplete="new-password"
          ref={passwordRef}
        />
        <InputError message={form.errors.password} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
        <Input
          id="password_confirmation"
          type="password"
          className="mt-1 block w-full"
          value={form.data.password_confirmation}
          onChange={e =>
            form.setData('password_confirmation', e.currentTarget.value)
          }
          autoComplete="new-password"
        />
        <InputError
          message={form.errors.password_confirmation}
          className="mt-2"
        />
      </div>
    </FormSection>
  );
}
