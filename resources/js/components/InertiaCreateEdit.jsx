import { AppLayout } from '..'
import {
  PageHeader,
  Container,
  Button,
  Card,
  List
} from '..'

import { Form } from '@ja-inertia/components'

export const FormLayout = ({

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

export const CreateLayout = ({ formSubmitButtonText, ...props }) => (
  <FormLayout formSubmitButtonText={formSubmitButtonText || 'Create'} {...props} />
)

export const EditLayout = ({ formSubmitButtonText, ...props }) => (
  <FormLayout formSubmitButtonText={formSubmitButtonText || 'Save'} {...props} />
)