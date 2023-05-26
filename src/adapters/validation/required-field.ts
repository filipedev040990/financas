import { MissingParamError } from '../errors'

export class RequiredFieldValidator {
  constructor (
    private readonly fieldName: string,
    private readonly fieldValue: string
  ) {}

  validate (): Error | undefined {
    if (!this.fieldValue) {
      return new MissingParamError(this.fieldName)
    }
  }
}
