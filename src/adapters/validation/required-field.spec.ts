export class RequiredFieldValidator {
  validate (input: RequiredFieldValidator.Input): Error | undefined {
    return undefined
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
})
