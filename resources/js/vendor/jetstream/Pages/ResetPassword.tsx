import { useEffect } from 'react'
import { AppLayout } from '@ja-inertia/components'
import { ButtonPrimary, Input, Label, ValidationErrors } from '@ja-inertia/components'
import { Head, useForm } from '@pckg/@inertiajs/react';

export default function ({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post('/reset-password');
    };

    return (
        <AppLayout sidebar={false}>

            <Head title={lang('auth.reset_password')} />

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="email" value={lang('auth.email')} />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1"
                        autoComplete="username"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label htmlFor="password" value={lang('auth.password')} />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoComplete="new-password"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label htmlFor="password_confirmation" value={lang('auth.confirm_password')} />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full mt-1"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <ButtonPrimary className="ml-4" disabled={processing}>
                        {lang('auth.reset_password')}
                    </ButtonPrimary>
                </div>
            </form>
        </AppLayout>
    );
}
