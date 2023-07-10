import { AuthLayout, Form } from '@ja-inertia/components'

export default function ({ status }) {

    const fields = [
        {name: 'email', label: 'Email Address', value: '', type: 'email', required: true}
    ]

    return (
        <AuthLayout>

            <div className="mb-4 text-sm leading-normal text-chrome-500">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <Form
                action={'/forgot-password'}
                method="POST"
                fields={fields}
                submitButtonText="Email Password Reset Link"
            />
            
        </AuthLayout>
    );
}