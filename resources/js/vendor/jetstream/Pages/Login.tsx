import { AuthLayout, Link, Form } from '@ja-inertia/components'

export default function ({ alerts, canResetPassword, canRegister }) {

  const fields = [
    {name: 'email',  label: lang('auth.email'),     value: '', type: 'email',  required: true},
    {name: 'password', label: lang('auth.password'),  value: '', type: 'password', required: true},
    // {name: 'remember', label: lang('auth.remember_me'), value: '', type: 'checkbox', required: false},
  ]

  return (
    <AuthLayout
      alerts={alerts}
      after={() => canRegister && (
        <div className="p-4 text-center">
          <Link href={route('register')} className="text-xs text-chrome-500 hover:text-chrome-900 dark:hover:text-chrome-400 transition-colors">
            {lang('auth.need_an_account')} <span className="font-medium underline">{lang('auth.register')}</span>
          </Link>
        </div>
      )}
    >

      <Form
        action={route('login')}
        method="POST"
        fields={fields}
        submitButtonText={lang('auth.log_in')} />

      <div className="absolute z-20 -mt-8">
        {canResetPassword && (
          <Link href={route('password.request')} className="text-xs text-chrome-500 hover:text-chrome-900 dark:hover:text-chrome-400">
            {lang('auth.forgot_your_password')}
          </Link>
        )}
      </div>
      
    </AuthLayout>
  )
}