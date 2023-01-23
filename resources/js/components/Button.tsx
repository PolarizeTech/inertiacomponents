import React, { PropsWithChildren } from 'react'
import { mergeCssClasses } from '../utils/css-classes'
import { Icon, Link } from '.'

export function Button({
  className = '',
  outline = false,
  ...props
}) {

  className = mergeCssClasses(
    className, 
    outline ? [
      // Border Color
      'border-chrome-200',
      'dark:border-chrome-700',
      // Text Color
      'text-chrome-500',
      'dark:border-chrome-700'
    ] : [
      // Border Color
      'border-chrome-300',
      'dark:border-transparent',
      // Text Color
      'text-chrome-700',
      'dark:text-white',
      // BG Color
      'bg-white',
      'dark:bg-chrome-600',
      // Hover BG Color
      'hover:bg-chrome-50',
      'dark:hover:bg-chrome-700',
    ],
    [
      'focus:ring-theme-200',
      'dark:focus:ring-offset-theme-700',
    ]
  )

  return (
    <ButtonTheme className={className} {...props} />
  )
}

export function ButtonPrimary({
  className = '',
  outline = false,
  ...props
}) {

  className = mergeCssClasses(
    className, 
    outline ? [
      'border-theme-200',
      'text-theme-500'
    ] : [
      'border-transparent',
      'text-theme-100',
      'bg-theme-700',
      'hover:bg-theme-700',
      'hover:text-white',
    ],
    [
      'transition-colors',
      'focus:ring-theme-200',
    ]
  )

  return (
    <ButtonTheme className={className} {...props} />
  )
}

const hasChildren = (ch) => (
  (Array.isArray(ch) && ch.filter(c => !!c).length > 0) || !!ch
)

interface ButtonThemeProps {
  text?: string
  className?: string
  icon?: string
  iconType?: string
  xs?: boolean
  sm?: boolean
  md?: boolean
  lg?: boolean
  border?: boolean
}

function ButtonTheme({
  text = '',
  className = '',
  xs = false,
  sm = false,
  md = false,
  lg = false,
  icon,
  iconType,
  border = true,
  children,
  ...props
}: PropsWithChildren<ButtonThemeProps>) {

  const isEmpty = !text && !hasChildren(children),
        isIconOnly = icon && isEmpty,
        size = (xs && 'xs') || (sm && 'sm') || (md && 'md') || (lg && 'lg') || 'base',
        sizeClassNames = {
          xs:   ['px-2.5',                     'py-1.5', 'text-xs'],
          sm:   [isIconOnly ? 'px-3' : 'px-3', 'py-2',   'text-sm', 'leading-4'],
          base: [isIconOnly ? 'px-3' : 'px-4', 'py-2',   'text-sm'],
          md:   [isIconOnly ? 'px-3' : 'px-4', 'py-2',   'text-base'],
          lg:   [isIconOnly ? 'px-4' : 'px-6', 'py-3',   'text-base'],
        }

  className = mergeCssClasses(
    className, 
    sizeClassNames[size],
    [
      'inline-flex',
      'items-center',
      'font-medium',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      'rounded-md',
      'shadow-sm',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'transition-all',
      border ? 'border' : '',
      icon && !isEmpty ? 'space-x-1' : '',
    ]
  )

  const ButtonIcon = () => icon === null ? (<></>) : (
    typeof icon === 'function' ? (
      <icon />
    ) : (
      <Icon
        className={!isEmpty ? 'relative -left-1' : ''}
        type={iconType}
        name={icon}
        sm={sm || xs || (!lg && !md && !sm && !xs)}
        fw />
    )
  )

  return (
    <ButtonUtility className={className} {...props}>
      <ButtonIcon />
      {!isEmpty && (
        <span>{text}{children}</span>
      )}
    </ButtonUtility>
  )
}

interface ButtonUtilityProps {
  route?: string|Array<string|object>
  href?: string
}

const ButtonUtility = ({
  type = 'button',
  route,
  href,
  children,
  ...props
}: PropsWithChildren<ButtonUtilityProps>) => {

  if (route || href) {
    return (
      <Link href={href} route={route} {...props}>{children}</Link>
    )
  }

  return (
    <button type={type} {...props}>{children}</button>
  )
}

export const ButtonGroup = ({ className = '', items }) => {

  if (!Array.isArray(items)) {
    return <></>
  }

  return (
    <div className={className}>
      {items.map(({ primary = false, ...props }) => (
        (primary)
          ? <ButtonPrimary key={JSON.stringify(props)} {...props} />
          : <Button key={JSON.stringify(props)} {...props} />
      ))}
    </div>
  )
}