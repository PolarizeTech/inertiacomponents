import { useForm, Head } from '@appModules/@inertiajs/inertia-react'
import lang from '../../utils/lang'
import {
  AuthLayout,
  ButtonPrimary,
  Input,
  Checkbox,
  Label,
  ValidationErrors,
  Link
} from '@blazervel/ui/components'

export default function ({ status, canResetPassword }) {
  
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: '',
  })

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <AuthLayout>

      <Head title={lang('auth.register')} />

      {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

      <ValidationErrors errors={errors} />

      <form onSubmit={submit}>
        
        <div>
          <Label forInput="email" value={lang('auth.email')} />
          <Input
            type="text"
            name="email"
            value={data.email}
            className="block w-full mt-1"
            autoComplete="username"
            isFocused={true}
            handleChange={onHandleChange}
          />
        </div>

        <div className="mt-4">
          <div className="md:flex items-center space-y-3 md:space-y-0 md:justify-between">
            <Label forInput="password" value={lang('auth.password')} />

            {canResetPassword && (
              <Link href={route('password.request')} className="text-xs text-chrome-500 hover:text-chrome-900 dark:hover:text-chrome-400">
                {lang('auth.forgot_your_password')}
              </Link>
            )}
          </div>

          <Input
            type="password"
            name="password"
            value={data.password}
            className="block w-full mt-1"
            autoComplete="current-password"
            handleChange={onHandleChange}
          />
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

            <span className="ml-2 text-sm text-chrome-500 dark:text-chrome-400">
              {lang('auth.remember_me')}
            </span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link href={route('register')} className="text-sm text-chrome-500 hover:text-chrome-900 dark:hover:text-chrome-400">
            {lang('auth.need_an_account')}
          </Link>

          <ButtonPrimary
            type="submit"
            className="ml-4"
            disabled={processing}
            text={lang('auth.log_in')} />
        </div>

      </form>

    </AuthLayout>
  )
}
