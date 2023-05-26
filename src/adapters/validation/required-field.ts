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
