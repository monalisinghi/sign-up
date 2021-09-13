import React, { FormEvent, useState } from 'react'
import { InputField } from './components/InputField/InputField'
import { InputOnChange } from './types'
import { isUndefinedOrEmpty, isValidUserName, isValidPassword } from './utils'

interface SignUpObjectType {
  [x: string]: boolean
}

interface SignUpDataType {
  [x: string]: string
}

function SignUpForm(): JSX.Element {
  const USERNAME: string = 'inputUserName'
  const PASSWORD: string = 'inputPassword'
  const CONFIRMPASSWORD: string = 'inputConfirmPassword'
  const mandatoryFields: string[] = [USERNAME, PASSWORD, CONFIRMPASSWORD]

  const errorMessages: SignUpDataType = {
    [USERNAME]: 'Username should be a valid email id i.e user@email.com.',
    [PASSWORD]:
      'Password should be 8 characters long with at least one capital letter, one numeric character and one special character.',
    [CONFIRMPASSWORD]: 'Confirm password does not match password.'
  }

  const [formData, setFormData] = useState<SignUpDataType>({
    [USERNAME]: '',
    [PASSWORD]: '',
    [CONFIRMPASSWORD]: ''
  })
  const [touched, setTouched] = useState<SignUpObjectType>({})
  const [errors, setErrors] = useState<SignUpObjectType>({})
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const doSetError = (valid: boolean, inputName: string): void => {
    const { [inputName]: removeError, ...otherErrors } = errors
    setErrors({
      ...otherErrors,
      ...(!valid && { [inputName]: true })
    })
  }

  const validate = {
    [USERNAME]: (value: string) => isValidUserName(value),
    [PASSWORD]: (value: string) => isValidPassword(value),
    [CONFIRMPASSWORD]: (value: string) =>
      isValidPassword(value) && value === formData[PASSWORD]
  }

  const handleChange = ({ target: { name, value } }: InputOnChange): void => {
    setFormData({
      ...formData,
      [name]: value
    })
    setTouched({
      ...touched,
      [name]: true
    })
  }

  const handleBlur = ({ target: { name, value } }: InputOnChange): void => {
    doSetError(validate[name](value), name)
  }

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    if (isFormReady() && Object.values(errors).length === 0) {
      setIsSubmitted(true)
    }
  }

  const renderFormData = (): JSX.Element[] => {
    const data = Object.values(formData)
    return data.map((value, index) => <p key={index}>{value}</p>)
  }

  const isFormReady = (): boolean =>
    Object.keys(errors).length === 0 &&
    Object.keys(formData)
      .filter((field) => mandatoryFields.includes(field))
      .every((current) => !isUndefinedOrEmpty(formData[current]))

  return (
    <section className="h-screen w-full flex justify-center items-center bg-green-500">
      <div className="container mx-auto p-5 bg-gray-50 w-80 rounded-lg shadow-lg">
        <h1 className="text-3xl text-purple-600 mb-4">Sign Up</h1>
        <form id="signUp" onSubmit={handleSubmit}>
          <InputField
            name={USERNAME}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData[USERNAME]}
            placeholder="Username"
            label="Username"
            error={errors[USERNAME]}
            errorText={errorMessages[USERNAME]}
          />
          <InputField
            name={PASSWORD}
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData[PASSWORD]}
            placeholder="Password"
            label="Password"
            error={errors[PASSWORD]}
            errorText={errorMessages[PASSWORD]}
          />
          <InputField
            name={CONFIRMPASSWORD}
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData[CONFIRMPASSWORD]}
            placeholder="Confirm Password"
            label="Confirm Password"
            error={errors[CONFIRMPASSWORD]}
            errorText={errorMessages[CONFIRMPASSWORD]}
          />
          <button
            type="submit"
            className="border-0 rounded-lg mt-2 px-6 py-2 text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-default"
            disabled={!isFormReady() || isSubmitted}
          >
            Submit
          </button>
        </form>
        {isSubmitted && (
          <div className="border rounded-lg bg-gray-50 mt-4 p-2">
            <h5 className="font-bold mb-2">Data submitted</h5>
            {renderFormData()}
          </div>
        )}
      </div>
    </section>
  )
}

export default SignUpForm
