import { useEffect } from '@appModules/preact/compat'
import { AppLayout } from '@blazervel/ui/components'
import lang from '../../utils/lang'
import { ButtonPrimary, Input, Label, ValidationErrors } from '@blazervel/ui/components'
import { Head, useForm } from '@appModules/@inertiajs/inertia-react';

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
                    <Label forInput="email" value={lang('auth.email')} />

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
                    <Label forInput="password" value={lang('auth.password')} />

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
                    <Label forInput="password_confirmation" value={lang('auth.confirm_password')} />

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
