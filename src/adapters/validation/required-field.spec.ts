import { MissingParamError } from '@/adapters/errors'
import { RequiredFieldValidator } from './required-field'

describe('RequiredFieldValidator', () => {
  test('should return undefined', () => {
    const sut = new RequiredFieldValidator('anyFieldName', 'anyFieldValue')
    const output = sut.validate()

    expect(output).toBeUndefined()
  })

  test('should return error if undefined field is provided', () => {
    const sut = new RequiredFieldValidator('anyFieldName', undefined as any)

    const output = sut.validate()

    expect(output).toEqual(new MissingParamError('anyFieldName'))
  })

  test('should return error if null field is provided', () => {
    const sut = new RequiredFieldValidator('anyFieldName', null as any)

    const output = sut.validate()

    expect(output).toEqual(new MissingParamError('anyFieldName'))
  })

  test('should return error if empty field is provided', () => {
    const sut = new RequiredFieldValidator('anyFieldName', '')

    const output = sut.validate()

    expect(output).toEqual(new MissingParamError('anyFieldName'))
  })
})
