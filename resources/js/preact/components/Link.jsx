import { Link } from '@appModules/@inertiajs/inertia-react'

export default function ({ href, children, target = null, external = false, ...props }) {

  const isExternal = (
    target === '_blank' || external === true
  )

  if (isExternal) {
    return <a href={href} target={target} {...props}>{children}</a>
  }

  return <Link href={href} {...props}>{children}</Link>

}