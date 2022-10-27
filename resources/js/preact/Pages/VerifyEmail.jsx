import { AppLayout } from '@blazervel/ui/components'
import { ButtonPrimary } from '@blazervel/ui/components'
import { Link } from '../components'
import { lang } from '../../utils'
import { Head, useForm } from '@appModules/@inertiajs/inertia-react'

export default function ({ status }) {
    const { post, processing } = useForm()

    const submit = (e) => {
        e.preventDefault()

        post('/email/verification-notification')
    }

    return (
        <AppLayout sidebar={false}>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-chrome-500">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="flex items-center justify-between mt-4">
                    <ButtonPrimary type="submit" disabled={processing} text={lang('auth.resend_verification_email')} />

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="text-sm text-chrome-500 underline hover:text-chrome-900"
                    >
                        {lang('auth.log_out')}
                    </Link>
                </div>
            </form>
        </AppLayout>
    )
}
