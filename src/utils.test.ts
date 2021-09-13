import { isUndefinedOrEmpty, isValidUserName, isValidPassword } from './utils'

describe('Utils', () => {
  it('should return `true` if value is empty', function () {
    expect(isUndefinedOrEmpty('')).toBeTruthy()
  })

  it('should return `false` if value is not empty', function () {
    expect(isUndefinedOrEmpty('Hello')).toBeFalsy()
  })

  it('should return `true` is username is a valid email address', function () {
    expect(isValidUserName('test@test.com')).toBeTruthy()
  })

  it('should return `false is username is not a valid email address', function () {
    expect(isValidUserName('test@.com')).toBeFalsy()
  })

  it('should return `true` is password 8 characters long with at least one capital letter, one numeric character and one special character', function () {
    expect(isValidPassword('P@ssw0rd')).toBeTruthy()
    expect(isValidPassword('@Pssw0rd')).toBeTruthy()
    expect(isValidPassword('p@ssw0rD')).toBeTruthy()
    expect(isValidPassword('P@sswrd0')).toBeTruthy()
  })

  it('should return `false` is password is not 8 characters long with at least one capital letter, one numeric character and one special character', function () {
    expect(isValidPassword('p@ssw0rd')).toBeFalsy()
    expect(isValidPassword('Passw0rd')).toBeFalsy()
    expect(isValidPassword('P@ssword')).toBeFalsy()
  })
})
