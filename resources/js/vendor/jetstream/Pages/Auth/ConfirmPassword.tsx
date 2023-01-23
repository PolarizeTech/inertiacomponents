import { useForm, Head } from '@pckg/@inertiajs/react';
import { mergeCssClasses as classNames } from '@ja-inertia/utils';
import React from 'react';

import AuthenticationCard from '@ja-inertia/vendor/jetstream/components/AuthenticationCard';
import InputError from '@ja-inertia/vendor/jetstream/components/InputError';
import InputLabel from '@ja-inertia/vendor/jetstream/components/InputLabel';
import PrimaryButton from '@ja-inertia/vendor/jetstream/components/PrimaryButton';
import TextInput from '@ja-inertia/vendor/jetstream/components/TextInput';

export default function ConfirmPassword() {
  //const route = useRoute();
  const form = useForm({
    password: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.confirm'), {
      onFinish: () => form.reset(),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Secure Area" />

      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextInput
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="current-password"
            autoFocus
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="flex justify-end mt-4">
          <PrimaryButton
            className={classNames('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Confirm
          </PrimaryButton>
        </div>
      </form>
    </AuthenticationCard>
  );
}
