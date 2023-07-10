import React, { PropsWithChildren } from 'react'
import { Link } from '@pckg/@inertiajs/react'
import { Link as LinkProps } from '../types'

export default ({
  route,
  href,
  method,
  children,
  external,
  ...props
}: PropsWithChildren<LinkProps>) => {

  const routeMethod = window?.route || null

  if (!href && route && routeMethod !== null) {
    if (Array.isArray(route)) {
      const [key, params] = route
      href = routeMethod(key, params)
    } else {
      href = routeMethod(route)
    }
  }

  if (props.target === '_blank' || external) {
    return (
      <a href={href} { ...props }>{children}</a>  
    )
  }

  return (
    <Link href={href} method={method} { ...props }>{children}</Link>
  )
}