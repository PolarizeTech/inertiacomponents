import { 
  AppLayout,
  PageHeader,
  Container,
  Card,
} from '@blazervel-ui/components'

import { Form } from '@ja-inertia/components'

const EditLayout = ({

  pageTitle,
  pageSuperHeading,
  pageBreadcrumbs,
  pageHeading,
  pageActions,

  formRoute,
  formMethod,
  formFields,
  formSubmitButtonText,
  formShowBackButton,

  children,

  ...props
  
}) => (
  <AppLayout pageTitle={pageTitle} {...props}>

    <Container sm>

      <PageHeader
        superHeading={pageSuperHeading}
        breadcrumbs={pageBreadcrumbs}
        heading={pageHeading || pageTitle}
        actions={pageActions}
        sm />

      <Card className="mt-8">

        {children && (
          <div>{children}</div>
        )}
        
        <Form
          route={formRoute}
          method={formMethod}
          fields={formFields}
          showBackButton={formShowBackButton}
          formSubmitButtonText={formSubmitButtonText} />

      </Card>

    </Container>

  </AppLayout>
)

export default function ({ team, teams, navigation, alerts, user }) {

  const fields = [
    {name: 'name',                  value: user.name,  label: lang('auth.name'),             type: 'text',     required: true},
    {name: 'email',                 value: user.email, label: lang('auth.email'),            type: 'email',    required: true},
    {name: 'password',              value: '',         label: lang('auth.password'),         type: 'password', required: false},
    {name: 'password_confirmation', value: '',         label: lang('auth.confirm_password'), type: 'password', required: false},
  ];

  return (
    <EditLayout
      navigation={navigation}
      team={team}
      teams={teams}
      alerts={alerts}
      pageSuperHeading={lang('auth.my_profile')}
      pageHeading={user.name}
      formRoute={route('user-profile-information.update')}
      formSubmitButtonText={lang('shared.save')}
      formShowBackButton
      formMethod="PUT"
      formFields={fields}/>
  )
}