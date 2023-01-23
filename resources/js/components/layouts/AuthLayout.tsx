import React, { PropsWithChildren } from 'react'
import {
  AppLayout,
  Card,
  Container,
  ApplicationLogo
} from '..'

interface Props {
  className?: string
  after?: Function
}

export default function ({ className, after, children, ...props }: PropsWithChildren<Props>) {
  return (
    <>
      <AppLayout
        className={`${className} bg-gradient-to-b from-theme-400 dark:from-theme-800 to-white dark:to-black`}
        sidebar={false}
        topbar={false}
        {...props}
      >
        <Container xs>

          <div className="flex justify-center">
            <ApplicationLogo text={false} lg />
          </div>

          <Card className="mt-6 bg-white dark:bg-chrome-900">
            {children}
          </Card>

          {after && after()}

        </Container>
      </AppLayout>
    </>
  )
}