import React, { PropsWithChildren } from 'react'
import { Head } from '@pckg/@inertiajs/react'
import { Sidebar, Topbar, Container, Alert } from '..'
import { useTypedPage } from '../../utils'

interface Props {
  sidebar: boolean
  topbar: boolean
  fullWidth: boolean
  className: string
}

export default function ({
  sidebar = true,
  topbar = false,
  fullWidth = false,
  fullHeight = false,
  className = '',
  children,
  ...props
}: PropsWithChildren<Props>) {

  const { jaInertia, team, teams, navigation, meta } = useTypedPage().props,
        { alerts } = jaInertia

  if (sidebar) {
    return (
      <div className={`${className} bg-white dark:bg-chrome-900 min-h-screen`} {...props}>

        <Sidebar navigation={navigation} team={team} teams={teams}>
          {topbar && (
            <Topbar navigation={navigation} team={team} teams={teams} />
          )}
          
          <div className="flex justify-end">
            <AlertMessage alerts={alerts} />
          </div>

          <div className={!fullHeight ? 'py-12' : ''}>
            {fullWidth ? children : (
              <Container>
                {children}
              </Container>
            )}
          </div>
        </Sidebar>
        
      </div>
    )
  }

  return (
    <>
      {meta?.title && (
        <Head title={meta.title} />
      )}
      
      <div id="dashboard" className={`${className} bg-white dark:bg-chrome-900 min-h-screen flex flex-col`} {...props}>


        {topbar && (
          <Topbar navigation={navigation} />
        )}

        <div className="flex justify-end">
          <AlertMessage alerts={alerts} />
        </div>

        <div className="flex-1 flex items-center">
          {fullWidth ? children : (
            <Container>
              {children}
            </Container>
          )}
        </div>
      </div>
    </>
  )
}

const AlertMessage = ({ alerts }) => {

  const messages = Object.entries(alerts)

  if (messages.length === 0) {
    return <></>
  }

  return (
    <div className="space-y-4 fixed top-6 right-6">
      {messages.map(([type, message]) => (
        <Alert key={Date.now()} type={type} text={message} />
      ))}
    </div>
  )
  
}