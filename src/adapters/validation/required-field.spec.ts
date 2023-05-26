import { MissingParamError } from '../errors'

export class RequiredFieldValidator {
  validate (input: RequiredFieldValidator.Input): Error | undefined {
    if (!input.fieldValue) {
      return new MissingParamError(input.fieldName)
    }
  }
}

export namespace RequiredFieldValidator {
  export type Input = {
    fieldName: string
    fieldValue: string
  }
}

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
