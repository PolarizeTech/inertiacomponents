import { InertiaLink, useForm, Head } from '@pckg/@inertiajs/inertia-react';
import { mergeCssClasses as classNames } from '@blazervel-ui/utils';
import React from '@pckg/preact/compat';

import AuthenticationCard from '@ja-inertia/react/jetstream/components/AuthenticationCard';
import PrimaryButton from '@ja-inertia/react/jetstream/components/PrimaryButton';

interface Props {
  status: string;
}

export default function VerifyEmail({ status }: Props) {
  //const route = useRoute();
  const form = useForm({});
  const verificationLinkSent = status === 'verification-link-sent';

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('verification.send'));
  }

  return (
    <AuthenticationCard>
      <Head title="Email Verification" />

      <div className="mb-4 text-sm text-gray-600">
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn't receive the email, we will gladly send you another.
      </div>

      {verificationLinkSent && (
        <div className="mb-4 font-medium text-sm text-green-600">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="mt-4 flex items-center justify-between">
          <PrimaryButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Resend Verification Email
          </PrimaryButton>

          <InertiaLink
            href={route('logout')}
            method="post"
            as="button"
            className="underline text-sm text-gray-600 hover:text-gray-900"
          >
            Log Out
          </InertiaLink>
        </div>
      </form>
    </AuthenticationCard>
  );
}
