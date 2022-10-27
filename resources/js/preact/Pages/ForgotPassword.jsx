import { AppLayout } from '@blazervel/ui/components'
import { ButtonPrimary, Input, ValidationErrors } from '@blazervel/ui/components'
import { Head, useForm } from '@appModules/@inertiajs/inertia-react';

export default function ({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post('/forgot-password');
    };

    return (
        <AppLayout sidebar={false}>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm leading-normal text-chrome-500">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <Input
                    type="text"
                    name="email"
                    value={data.email}
                    className="block w-full mt-1"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <div className="flex items-center justify-end mt-4">
                    <ButtonPrimary className="ml-4" disabled={processing}>
                        Email Password Reset Link
                    </ButtonPrimary>
                </div>
            </form>
        </AppLayout>
    );
}
