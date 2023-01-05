import { useEffect } from '@pckg/preact/compat'
import { Head, useForm } from '@pckg/@inertiajs/inertia-react'
import {
  AuthLayout,
  ButtonPrimary,
  Input,
  Label,
  ValidationErrors,
  Link
} from '@blazervel-ui/components'

export default function () {

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation')
    }
  }, [])

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
  }

  const submit = (e) => {
    e.preventDefault()

    post('/register')
  }

  return (
    <AuthLayout
      pageTitle={lang('auth.register')}
      after={() => (
        <div className="p-4 text-center">
          <Link href={route('login')} className="text-xs text-chrome-500 hover:text-chrome-900 dark:hover:text-chrome-400 transition-colors">
            {lang('auth.already_registered')} <span className="font-medium underline">{lang('auth.login')}</span>
          </Link>
        </div>
      )}
    >

      <ValidationErrors errors={errors} />

      <Head title={lang('auth.register')} />
    
      <form onSubmit={submit} className="space-y-4">

        <div>
          <Label forInput="name" value={lang('auth.name')} />
          <Input
              type="text"
              name="name"
              value={data.name}
              className="block w-full mt-1"
              autoComplete="name"
              isFocused={true}
              handleChange={onHandleChange}
              required
          />
        </div>

        <div>
          <Label forInput="email" value={lang('auth.email')} />
          <Input
            type="email"
            name="email"
            value={data.email}
            className="block w-full mt-1"
            autoComplete="username"
            handleChange={onHandleChange}
            required
          />
        </div>

        <div>
          <Label forInput="password" value={lang('auth.password')} />

          <Input
            type="password"
            name="password"
            value={data.password}
            className="block w-full mt-1"
            autoComplete="new-password"
            handleChange={onHandleChange}
            required
          />
        </div>

        <div>
          <Label forInput="password_confirmation" value={lang('auth.confirm_password')} />

          <Input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="block w-full mt-1"
            handleChange={onHandleChange}
            required
          />
        </div>

        <div className="flex items-center justify-end">
          <ButtonPrimary
            type="submit"
            className="ml-4"
            disabled={processing}
            text={lang('auth.register')} />
        </div>
        
      </form>
    </AuthLayout>
  )
}
