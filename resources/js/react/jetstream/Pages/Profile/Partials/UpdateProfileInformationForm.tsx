import { Inertia } from '@pckg/@inertiajs/inertia'
import { useForm, usePage } from '@pckg/@inertiajs/inertia-react'
import { mergeCssClasses as classNames } from '@blazervel-ui/utils'
import React, { useRef, useState } from '@pckg/preact/compat'

import ActionMessage from '@ja-inertia/react/jetstream/components/ActionMessage'
import FormSection from '@ja-inertia/react/jetstream/components/FormSection'
import InputError from '@ja-inertia/react/jetstream/components/InputError'
import InputLabel from '@ja-inertia/react/jetstream/components/InputLabel'
import { User } from '@ja-inertia/react/jetstream/types'
import { Input, Button, ButtonPrimary } from '@blazervel-ui/components'

interface Props {
  user: User
  profilePhotoUrl: string
}

export default function UpdateProfileInformationForm({ user, profilePhotoUrl }: Props) {
  const form = useForm({
    _method: 'PUT',
    name: user.name,
    email: user.email,
    photo: null as File | null,
  })
  //const route = useRoute()
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const photoRef = useRef<HTMLInputElement>(null)
  const page = usePage<any>()

  function updateProfileInformation() {
    form.post(route('user-profile-information.update'), {
      errorBag: 'updateProfileInformation',
      preserveScroll: true,
      onSuccess: () => clearPhotoFileInput()
    })
  }

  function selectNewPhoto() {
    photoRef.current?.click()
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0]

    if (!photo) {
      return
    }

    form.setData('photo', photo)

    const reader = new FileReader()

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string)
    }

    reader.readAsDataURL(photo)
  }

  function deletePhoto() {
    Inertia.delete(route('current-user-photo.destroy'), {
      preserveScroll: true,
      onSuccess: () => {
        setPhotoPreview(null)
        clearPhotoFileInput()
      },
    })
  }

  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = ''
      form.setData('photo', null)
    }
  }

  return (
    <FormSection
      onSubmit={updateProfileInformation}
      title={'Profile Information'}
      description={`Update your account's profile information and email address.`}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>

          <ButtonPrimary onClick={updateProfileInformation} processing={form.processing} text="Save" />
        </>
      )}
    >
      {page.props.jetstream.managesProfilePhotos ? (
        <div>
          <input
            type="file"
            className="hidden"
            ref={photoRef}
            onChange={updatePhotoPreview}
          />

          <InputLabel htmlFor="photo" value="Photo" />

          <div className="flex items-center space-x-6">
            {photoPreview ? (
              <div className="mt-2">
                <span
                  className="block rounded-full w-20 h-20"
                  style={{
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundImage: `url('${photoPreview}')`,
                  }}
                ></span>
              </div>
            ) : (
              <div className="mt-2">
                <img
                  src={profilePhotoUrl}
                  alt={user.name}
                  className="rounded-full h-20 w-20 object-cover"
                />
              </div>
            )}

            <Button
              className="mt-2 mr-2"
              onClick={selectNewPhoto}
              text="Upload" />

            {user.profile_photo_path ? (
              <Button
                className="mt-2"
                onClick={deletePhoto}
                text="Remove" />
            ) : null}

            <InputError message={form.errors.photo} className="mt-2" />
          </div>
        </div>
      ) : null}

      <div>
        <InputLabel htmlFor="name" value="Name" />
        <Input
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          autoComplete="name"
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="email" value="Email" />
        <Input
          id="email"
          type="email"
          className="mt-1 block w-full"
          value={form.data.email}
          onChange={e => form.setData('email', e.currentTarget.value)}
        />
        <InputError message={form.errors.email} className="mt-2" />
      </div>
    </FormSection>
  )
}
