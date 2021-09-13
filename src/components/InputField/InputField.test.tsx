import { InputField } from './InputField'
import { render } from '@testing-library/react'

const noop = (): void => {}

describe('InputField', () => {
  it('should render InputFiled', function () {
    const { getByPlaceholderText } = render(
      <InputField
        name="Username"
        type="text"
        onChange={() => noop}
        onBlur={() => noop}
        value=""
        placeholder="Username"
        label="Username"
        error={false}
        errorText=""
      />
    )
    expect(getByPlaceholderText('Username')).toBeInTheDocument()
  })
})
