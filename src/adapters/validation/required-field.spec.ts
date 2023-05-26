import { MissingParamError } from '@/adapters/errors'
import { RequiredFieldValidator } from './required-field'

describe('RequiredFieldValidator', () => {
  let input: RequiredFieldValidator.Input
  let sut: RequiredFieldValidator

  beforeEach(() => {
    sut = new RequiredFieldValidator()
    input = {
      fieldName: 'anyFieldName',
      fieldValue: 'anyFieldValue'
    }
  })

  test('should return undefined', () => {
    const output = sut.validate(input)

    expect(output).toBeUndefined()
  })

  test('should return error if empty or null or undefined field is provided', () => {
    input.fieldValue = ''

    const output = sut.validate(input)

    expect(output).toEqual(new MissingParamError(input.fieldName))
  })
})
