import { InvalidParamError } from '@/adapters/errors'
import { badRequest } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'

export class CreateBillController {
  async execute (input: HttpRequest): Promise<any> {
    const invalidPaymentTypeError = this.paymentTypeValidation(input.body?.type)
    if (invalidPaymentTypeError) {
      return badRequest(invalidPaymentTypeError)
    }
    return null
  }

  private paymentTypeValidation (type: string): Error | undefined {
    const allowedTypes = ['pay', 'receive']
    if (!type || !allowedTypes.includes(type)) {
      return new InvalidParamError('type')
    }
  }
}
