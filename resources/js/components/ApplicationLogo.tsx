import { Icon } from '.'
import { mergeCssClasses } from '../utils'

export function ApplicationLogo({ text = null, icon = null, lg = false, xl = false, className }) {

  text = text === null ? import.meta.env.VITE_APP_NAME : text
  icon = icon === null ? import.meta.env.VITE_APP_ICON : icon
  
  return (
    <>
      <div className={`group flex items-center space-x-2 ${className}`}>
        {icon && (
          <div className={mergeCssClasses(
            {
              'w-10 h-10': lg,
              'w-8 h-8': !lg,
            },
            [
              'inline-flex',
              'items-center',
              'justify-center',
              'bg-gradient-to-r',
              'from-theme-400',
              'to-theme-200',
              'group-hover:opacity-70',
              'rounded-lg',
              'overflow-hidden',
              'transition-opacity'
            ]
          )}>
            <Icon
              name={icon}
              lg={!lg}
              xl={lg}
              className="text-theme-700"
              fw />
          </div>
        )}
        {text && (
          <span className="font-bold text-theme-400 dark:text-theme-300 transition-colors">
            {text}
          </span>
        )}
      </div>
    </>
  )
}