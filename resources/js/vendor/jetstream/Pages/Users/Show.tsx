import React, { PropsWithChildren } from 'react'
import { AppLayout, PageHeader, Container, Card, Form } from '@ja-inertia/components'
import { BreadCrumb } from '@ja-inertia/types'
import { useTypedPage } from '@ja-inertia/utils'

interface Props {
  user: object
}

export default function ({ user }: Props) {

  const fields = [
    {name: 'name',                  value: user.name,  label: lang('auth.name'),             type: 'text',     required: true},
    {name: 'email',                 value: user.email, label: lang('auth.email'),            type: 'email',    required: true},
    {name: 'password',              value: '',         label: lang('auth.password'),         type: 'password', required: false},
    {name: 'password_confirmation', value: '',         label: lang('auth.confirm_password'), type: 'password', required: false},
  ];

  const { team, teams, navigation, alerts } = useTypedPage().props

  return (
    <Layout
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

interface LayoutProps {
  pageTitle?: string
  pageSuperHeading?: string
  pageBreadcrumbs?: Array<BreadCrumb>
  pageHeading?: string
  pageActions?: string
  formRoute?: string
  formMethod?: string
  formFields?: string
  formSubmitButtonText?: string
  formShowBackButton?: string
}

const Layout = ({
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
}: PropsWithChildren<LayoutProps>) => (
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
          action={formRoute}
          method={formMethod}
          fields={formFields}
          showBackButton={formShowBackButton}
          formSubmitButtonText={formSubmitButtonText} />

      </Card>

    </Container>

  </AppLayout>
)