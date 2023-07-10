import React from 'react'
import { Label } from '.'

export function Checkbox({
  label = null,
  id = null,
  name,
  value,
  checked,
  handleChange,
  ...props
}) {

  const Input = () => (
    <input
      id={id || name}
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      className="rounded border-chrome-300 text-theme-700 shadow-sm focus:border-theme-300 focus:ring focus:ring-theme-200 focus:ring-opacity-50"
      onChange={(e) => handleChange(e)}
      {...props}
    />
  )

  return label ? (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <Input />
      </div>
      <div className="ml-3 text-sm">
        <Label htmlFor={id || name} value={label} />
      </div>
    </div>
  ) : (
    <Input />
  )
}
