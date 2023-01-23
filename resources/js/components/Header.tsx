import { Icon, ButtonGroup, Link, Breadcrumbs } from '.'
import { mergeCssClasses } from '../utils'

export function SectionHeader({
  icon,
  iconType,
  superHeading,
  breadcrumbs,
  heading,
  children,
  actions,
  subHeading,
  xs = false,
  sm = false,
  lg = false,
  xl = false,
  className,
  ...props
}) {

  const headingClassNames = mergeCssClasses({
    'text-sm font-medium': xs,
    'text-sm sm:text-base font-semibold': sm,
    'text-xl sm:text-2xl font-semibold': lg,
    'text-2xl sm:text-3xl font-semibold': xl,
    'sm:text-xl font-semibold': !(xs || sm || lg || xl)
  })

  const iconWrapperClasses = mergeCssClasses({
    'h-7 w-7': xs,
    'h-10 w-10': !xs && (sm || lg || xl),
  })

  const iconIsIMG = (
    icon &&
    icon.includes('//') && (
      icon.includes('.png')  ||
      icon.includes('.jpg')  ||
      icon.includes('.jpeg') ||
      icon.includes('.svg')
    )
  )

  return (
    <div className={className} {...props}>

      {breadcrumbs && (
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      )}

      <div className={`${breadcrumbs ? 'mt-3 ' : ''}${!icon || subHeading || superHeading ? 'items-start ' : 'items-center '}flex justify-between`}>

        {icon && (
          <div className={`${subHeading ? 'pt-1' : ''} pr-3`}>
            <div className={`${iconWrapperClasses} rounded-lg overflow-hidden flex items-center justify-center bg-theme-200 dark:bg-chrome-800`}>
              <Icon
                name={icon}
                type={iconType}
                sm={xs}
                lg={(lg || xl) && !iconIsIMG}
                xl={iconIsIMG}
                className={mergeCssClasses({
                    'text-white dark:text-chrome-600': !icon?.includes('<svg'),
                    'fill-white dark:fill-chrome-600': icon?.includes('<svg'),
                })} />
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">

          {superHeading && (
            <div className="uppercase tracking-wider text-[0.6rem] font-medium text-chrome-400 dark:text-chrome-600">
              {superHeading}
            </div>
          )}

          <h2 className={`${headingClassNames} leading-7 text-theme-900 dark:text-chrome-100 sm:truncate`}>
            {heading}
            {children}
          </h2>

          {subHeading && (
            <div className={`${lg ? 'text-base' : 'text-sm'} mt-1 text-chrome-500`}>
              {subHeading}
            </div>
          )}

        </div>

        {typeof actions == 'function' && (
          <actions />
        )}

        {Array.isArray(actions) && (
          <ButtonGroup items={actions} className="flex-shrink-0 flex items-center space-x-3" />
        )}

      </div>

    </div>
  )
}

export const PageHeader = ({ ...props }) => (
  <SectionHeader lg {...props} />
)