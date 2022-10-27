import { EditLayout } from '@blazervel/ui/components'
import lang from '../../utils/lang'

export default function ({ user }) {
  
  const fields = [
    {name: 'name',                  value: user.name,  label: lang('auth.name'),             type: 'text',     required: true},
    {name: 'email',                 value: user.email, label: lang('auth.email'),            type: 'email',    required: true},
    {name: 'password',              value: '',         label: lang('auth.password'),         type: 'password', required: false},
    {name: 'password_confirmation', value: '',         label: lang('auth.confirm_password'), type: 'password', required: false},
  ];

  return (
    <EditLayout
      pageSuperHeading={lang('auth.my_profile')}
      pageHeading={user.name}
      formRoute="/user/profile-information"
      formSubmitButtonText={lang('users.update')}
      formShowBackButton
      formMethod="PUT"
      formFields={fields}/>
  )
}