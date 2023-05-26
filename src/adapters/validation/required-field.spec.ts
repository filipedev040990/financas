import { MissingParamError } from '../errors'
import { RequiredFieldValidator } from './required-field'

describe('RequiredFieldValidator', () => {
  let input: RequiredFieldValidator.Input

  beforeEach(() => {
    input = {
      fieldName: 'anyFieldName',
      fieldValue: 'anyFieldValue'
    }
  })

  test('should return undefined', () => {
    const sut = new RequiredFieldValidator()

    const output = sut.validate(input)

    expect(output).toBeUndefined()
  })

  test('should return error if empty or null or undefined field is provided', () => {
    input.fieldValue = ''

    const sut = new RequiredFieldValidator()

    const output = sut.validate(input)

    expect(output).toEqual(new MissingParamError(input.fieldName))
  })
})
