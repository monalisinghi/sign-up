import SignUpForm from './SignUpForm'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('SignUpForm', () => {
  it('should render sign up form', function () {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <SignUpForm />
    )

    expect(getByText('Sign Up')).toBeInTheDocument()
    expect(getByPlaceholderText('Username')).toBeInTheDocument()
    expect(getByPlaceholderText('Password')).toBeInTheDocument()
    expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument()
    expect(getByRole('button')).toBeDisabled()
  })
})

describe('validate Username', () => {
  it('should show invalid username error', function () {
    const { getByText, getByPlaceholderText, rerender } = render(<SignUpForm />)
    userEvent.type(getByPlaceholderText(/Username/), 'test@.com')
    userEvent.tab()
    rerender(<SignUpForm />)

    expect(
      getByText(/Username should be a valid email id i.e user@email.com./)
    ).toBeInTheDocument()
  })
})

describe('validate Password', () => {
  it('should show invalid password error', function () {
    const { getByText, getByPlaceholderText, rerender } = render(<SignUpForm />)
    userEvent.type(getByPlaceholderText(/Password/), 'P@ssword')
    userEvent.tab()
    rerender(<SignUpForm />)

    expect(
      getByText(
        /Password should be 8 characters long with at least one capital letter, one numeric character and one special character./
      )
    ).toBeInTheDocument()
  })
})

describe('validate Confirm Password', () => {
  it('should show invalid confirm password error', function () {
    const { getByText, getByPlaceholderText, rerender } = render(<SignUpForm />)
    userEvent.type(getByPlaceholderText('Password'), 'P@ssw0rd')
    userEvent.tab()
    userEvent.type(getByPlaceholderText('Confirm Password'), 'p@ssw0rd')
    userEvent.tab()
    rerender(<SignUpForm />)

    expect(
      getByText(/Confirm password does not match password./)
    ).toBeInTheDocument()
  })
})

describe.only('validate all fields', () => {
  it('should enable submit button', function () {
    const { getByRole, getByPlaceholderText, rerender } = render(<SignUpForm />)
    userEvent.type(getByPlaceholderText('Username'), 'test@test.com')
    userEvent.tab()
    userEvent.type(getByPlaceholderText('Password'), 'P@ssw0rd')
    userEvent.tab()
    userEvent.type(getByPlaceholderText('Confirm Password'), 'P@ssw0rd')
    userEvent.tab()
    rerender(<SignUpForm />)

    expect(getByRole('button')).not.toBeDisabled()
  })
})

describe('submit form values', () => {
  it('should show submitted values', function () {
    const { getByText, getByRole, getByPlaceholderText, rerender } = render(
      <SignUpForm />
    )
    userEvent.type(getByPlaceholderText('Username'), 'test@test.com')
    userEvent.tab()
    userEvent.type(getByPlaceholderText('Password'), 'P@ssw0rd')
    userEvent.tab()
    userEvent.type(getByPlaceholderText('Confirm Password'), 'P@ssw0rd')
    userEvent.tab()
    userEvent.click(getByRole('button'))
    rerender(<SignUpForm />)

    expect(getByText('test@test.com')).toBeInTheDocument()
  })
})
