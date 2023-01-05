import { AuthLayout, Form } from '@blazervel-ui/components'

export default function () {

    const fields = [
        {name: 'password', value: '', type: 'password', required: true}
    ]

    return (
        <AuthLayout>

            <div className="mb-4 text-sm text-chrome-500">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <Form
                route={'/user/confirm-password'}
                method="POST"
                fields={fields}
            />

        </AuthLayout>
    )
}
