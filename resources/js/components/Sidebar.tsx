import React, { PropsWithChildren, useState } from 'react'
import { mergeCssClasses } from '../utils/css-classes'
import {
  ApplicationLogo,
  Link,
  Icon,
  Toggle,
  Dropdown,
  Button,
  ButtonPrimary
} from '.'
import { NavLink, Team } from '../types'

interface Props {
  navigation: Array<NavLink>,
  team?: Team
  teams?: Array<Team>
}

export default ({
  navigation = [],
  team = null,
  teams = [],
  children
}: PropsWithChildren<Props>) => {

  const [sidebarOpen, setSidebarOpen] = useState(false),
        showDarkModeSwitcher = import.meta.env.VITE_DARKMODE_SWITCHER === 'true'

  const DarkModeSwitcher = () => (
    <Toggle icon="sun" iconToggled="moon" handleChange={(event) => (
      event.target.toggled
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark')
    )} />
  )

  return (
    <div className="relative min-h-screen">

      <div className={`${sidebarOpen ? 'flex' : 'hidden'} absolute z-40 bg-chrome-50 h-full dark:bg-chrome-900 md:flex w-64 max-w-full md:flex-col md:fixed md:inset-y-0`}>
        
        <div className="bg-gradient-to-r from-white to-chrome-100 dark:from-chrome-900 dark:to-chrome-800 absolute inset-0 z-1"></div>

        <div className="relative z-10 flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            
            <a href="/" className="block flex-shrink-0 px-4">
              <ApplicationLogo />
            </a>

            {Array.isArray(teams) && (
              <div className="px-4 pt-4 flex flex-col relative z-10">
                <Dropdown buttonText={team.name}>
                  <div className="overflow-hidden divide-y divide-chrome-100 space-y-1">
                    <div className="flex flex-col">
                      {teams.filter(tm => tm.id !== team.id).map(tm => (
                        <Button
                          method="PUT"
                          href={route('current-team.update', {team_id: tm.id})}
                          className="block px-4 py-2 text-sm !shadow-none !rounded-none !ring-transparent !outline-none"
                          border={false}
                        >
                          {tm.name}
                        </Button>
                      ))}
                    </div>
                    <div className="px-2 pt-2 pb-1">
                      <ButtonPrimary href={route('teams.create')} icon="plus" text={lang('teams.create_team')} sm className="w-full" />
                    </div>
                  </div>
                </Dropdown>
              </div>
            )}

            <Navigation navigation={navigation} />
              
            {showDarkModeSwitcher && (
              <div className="px-4">
                <DarkModeSwitcher />
              </div>
            )}

          </div>
        </div>

      </div>

      <div className="md:pl-64 flex flex-col flex-1">

        <div className="sticky top-0 ml-auto z-10 md:hidden pr-2 pt-2 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="h-10 w-10 inline-flex items-center justify-center rounded-md text-chrome-500 hover:text-chrome-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme-200 bg-chrome-100 dark:bg-chrome-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            {!sidebarOpen ? (
              <Icon name="bars" lg className="text-chrome-900" />
            ) : (
              <Icon name="times" lg className="text-chrome-900" />
            )}
          </button>
        </div>

        <main className="flex-1">
          {children}
        </main>

      </div>

    </div>
  )
}

const Navigation = ({ navigation }) => (
  <nav className="mt-5 flex-1 px-4 space-y-3">
    {navigation.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className={mergeCssClasses(
          item.current && 'bg-chrome-200 text-chrome-700 dark:text-chrome-400 dark:bg-chrome-800',
          !item.current && 'text-chrome-600 hover:text-chrome-700 dark:text-chrome-600 dark:hover:bg-chrome-800 dark:hover:text-chrome-400',
          'group flex items-center p-1.5 font-medium rounded-lg transition-colors'
        )}
      >
        <Icon
          name={item.icon}
          className={mergeCssClasses(
            item.current ? {
              'mr-2 text-theme-500 dark:text-theme-600': item.icon && !item.icon.includes('<svg'),
              'mr-2 text-theme-400 group-hover:text-theme-500 dark:text-theme-800 dark:group-hover:text-theme-500': item.icon && !item.icon.includes('<svg'),
              'mr-1 fill-theme-500 dark:fill-theme-600': item.icon && item.icon.includes('<svg'),
              'mr-1 fill-theme-400 group-hover:fill-theme-500 dark:fill-theme-800 dark:group-hover:fill-theme-500': item.icon && item.icon.includes('<svg'),
            } : {
              'mr-2 text-chrome-500 dark:text-chrome-600': item.icon && !item.icon.includes('<svg'),
              'mr-2 text-chrome-400 group-hover:text-chrome-500 dark:text-chrome-800 dark:group-hover:text-chrome-500': item.icon && !item.icon.includes('<svg'),
              'mr-1 fill-chrome-500 dark:fill-chrome-600': item.icon && item.icon.includes('<svg'),
              'mr-1 fill-chrome-400 group-hover:fill-chrome-500 dark:fill-chrome-800 dark:group-hover:fill-chrome-500': item.icon && item.icon.includes('<svg'),
            },
            'pt-0.5 flex-shrink-0 transition-colors'
          )}
          fw
        />
        <span title={item.name} className="-mb-0.5 truncate">
          {item.name}
        </span>
      </Link>
    ))}
  </nav>
)