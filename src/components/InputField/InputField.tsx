import React, { FunctionComponent } from 'react'
import { InputOnChange } from '../../types'

export interface Props {
  name: string
  type: string
  onChange: (e: InputOnChange) => any
  onBlur: (e: InputOnChange) => any
  value: string
  placeholder: string
  label: string
  error: boolean
  errorText: string
}

export const InputField: FunctionComponent<Props> = ({
  name,
  type,
  onChange,
  onBlur,
  value,
  placeholder,
  label,
  error,
  errorText
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1">
        {label}
      </label>
      <input
        aria-label={name}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        className={
          error
            ? 'border border-red-500 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent'
            : 'border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent'
        }
      />
      {error && <span className="text-red-500 text-xs mt-2">{errorText}</span>}
    </div>
  )
}
