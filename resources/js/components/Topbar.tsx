import React, { PropsWithChildren, useState, useEffect, useRef } from 'react'
import { Container, ApplicationLogo, Link } from '@ja-inertia/components'
import { userAvatarUrl } from '../utils'

interface Props {
  user: User
  navigation: Array<NavLink>
  className?: string
}

export default function ({ className = '', navigation = [], user = {} }: PropsWithChildren<Props>) {

  const [openMobileMenu, setOpenMobileMenu] = useState(false),
        [openUserMenu, setOpenUserMenu]     = useState(false),
        userMenu                            = useRef(null),
        showUserMenu                        = useRef(null),
        initialsImageUrl                    = userAvatarUrl(user)

  useEffect(() => {

    const handleClickOutsideUserMenu = (event) => {
      if (
        !openUserMenu                               ||
        !showUserMenu.current                       ||
        !userMenu.current                           ||
        showUserMenu.current.contains(event.target) ||
        userMenu.current.contains(event.target)
      ) {
        return
      }

      setOpenUserMenu(false)
    }

    document.addEventListener('mousedown', handleClickOutsideUserMenu)

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideUserMenu)
    }
    
  }, [])

  return (
    <nav className={`${className} relative bg-gradient-to-t from-chrome-50 via-white dark:from-chrome-800 dark:via-chrome-900 z-40`}>
      <Container lg>
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

            <button
              type="button"
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
              className="inline-flex items-center justify-center rounded-md p-2 text-chrome-400 hover:bg-chrome-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {openMobileMenu ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <ApplicationLogo />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map(item => (
                  <Link
                    href={item.href}
                    className={`${item.current ? 'bg-chrome-900 text-white' : 'text-chrome-300 hover:bg-chrome-700 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
                    ariaCurrent={item.current ? 'page' : null} />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button type="button" className="rounded-full bg-chrome-800 p-1 text-chrome-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-chrome-800">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  id="user-menu-button"
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  ref={showUserMenu}
                  className="flex rounded-full bg-chrome-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-chrome-800"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={user.profile_photo || initialsImageUrl} alt="" />
                </button>
              </div>

              <div
                className={`${openUserMenu ? 'opacity-100 mt-2' : 'opacity-0 -mt-10 hidden'} absolute right-0 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                ref={userMenu}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                {/* Active: "bg-chrome-100", Not Active: "" */}
                <a href="#" className="block px-4 py-2 text-sm text-chrome-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-chrome-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-chrome-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
              </div>

            </div>
          </div>
        </div>
      </Container>

      {openMobileMenu && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map(item => (
              <Link
                href={item.href}
                className={`${item.current ? 'bg-chrome-900 text-white' : 'text-chrome-300 hover:bg-chrome-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`}
                ariaCurrent={item.current ? 'page' : null} />
            ))}
          </div>
        </div>
      )}

    </nav>
  )
}