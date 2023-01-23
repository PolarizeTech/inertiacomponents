import React, { useState } from 'react'
import { Label, Button, Icon, Input } from '.'
import { mergeCssClasses } from '../utils/css-classes'

export default function({ label, options, handleChange }) {

  const [query, setQuery] = useState(''),
        [selectedOption, setSelectedOption] = useState(),
        [open, setOpen] = useState(false),
        Option = ({ value, children, ...props }) => <div {...props}>{children}</div>,
        filteredOptions = query === ''
          ? options
          : options.filter((option) => option.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      
      {label && (
        <Label className="block text-sm font-medium text-chrome-700">{label}</Label>
      )}
      
      <div className={`relative ${label && 'mt-1'}`}>

        <Input
          className="w-full rounded-md border border-chrome-200 dark:text-white dark:border-chrome-700 bg-white dark:bg-chrome-800 py-2 pl-3 pr-10 shadow-sm focus:border-theme-500 focus:outline-none focus:ring-1 focus:ring-theme-200 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option) => option && option.name}
        />

        <Button onClick={() => setOpen(true)} className="border-none bg-transparent absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <Icon name="chevron-down" className="h-5 w-5 text-chrome-500" aria-hidden="true" />
        </Button>

        {filteredOptions.length > 0 && (
          <div className={`${!open && 'hidden'} absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-chrome-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className={({ active }) =>
                  mergeCssClasses(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-theme-600 text-white' : 'dark:text-white'
                  )
                }
              >
                <span className={mergeCssClasses('block truncate', selectedOption === option.id && 'font-semibold')}>
                  {option.name}
                </span>

                {selectedOption === option.id && (
                  <span
                    className={mergeCssClasses(
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                      active ? 'text-white' : 'text-theme-700'
                    )}
                  >
                    <Icon name="check" className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}