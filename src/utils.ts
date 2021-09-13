export const isUndefinedOrEmpty = (value: string): boolean => {
  return (value ?? '').trim().length === 0
}

export const isValidUserName = (name: string): boolean => {
  if (isUndefinedOrEmpty(name)) return false
  const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
  return regex.test(name)
}

export const isValidPassword = (password: string): boolean => {
  if (isUndefinedOrEmpty(password)) return false

  const regex = /(?=(.*[A-Z]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=(.*[0-9])).{8,}/
  return regex.test(password)
}
