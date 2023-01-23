import { useState } from 'react'
import { Icon, Label } from '.'

export default function ({ name, label = null, value = false, icon, iconToggled, handleChange, className = '', disabled = null }) {

  const [toggled, setToggled] = useState(value),
        handleToggle = () => {
          if (disabled) {
            return
          }

          setToggled(!toggled)
          handleChange(name, !toggled)
        }

  const ToggleButton = () => (
    <div className={`${className} ${toggled ? 'bg-theme-600' : 'bg-chrome-200'} cursor-pointer relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-theme-200 focus:ring-offset-2`}>
      <span className="sr-only">Use setting</span>

      <span className={`${toggled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}>

        <span key="untoggled" className={`${toggled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`} aria-hidden="true">
          {icon && (
            <Icon name={icon} sm className="text-chrome-400" />
          )}
        </span>

        <span key="toggled" className={`${toggled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`} aria-hidden="true">
          {icon && (
            <Icon name={iconToggled || icon} sm className="text-theme-700" />
          )}
        </span>

      </span>

    </div>
  )

  return (
    <button
      type="button"
      onClick={handleToggle}
      role="switch"
      class="flex items-center space-x-2"
      disabled={disabled}
      aria-checked={toggled ? 'true' : 'false'}
    >
      <ToggleButton />

      {label && (
        <Label value={label} className="truncate" />
      )}
    </button>
  )
}
