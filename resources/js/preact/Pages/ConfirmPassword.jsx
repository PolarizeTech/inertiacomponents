import { AppLayout } from '@blazervel/ui/components'
import { ButtonPrimary, Input, Label, ValidationErrors } from '@blazervel/ui/components'
import { useEffect } from '@appModules/preact/compat'
import { Head, useForm } from '@appModules/@inertiajs/inertia-react'

export default function () {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    })

    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post('/user/confirm-password')
    }

    return (
        <AppLayout sidebar={false}>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-chrome-500">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <ButtonPrimary className="ml-4" disabled={processing}>
                        Confirm
                    </ButtonPrimary>
                </div>
            </form>
        </AppLayout>
    )
}
