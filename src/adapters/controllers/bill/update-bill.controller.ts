import { InvalidParamError } from '@/adapters/errors'
import { badRequest } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import config from '@/infra/config'

export class UpdateBillController {
  constructor (
    private readonly getBillByIdUseCase: GetBillByIdUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    const inputError = await this.inputValidation(input)
    if (inputError) {
      return badRequest(inputError)
    }
  }

  private async inputValidation (input: HttpRequest): Promise<Error | undefined> {
    const invalidIdError = this.idValidation(input?.params?.id)
    if (invalidIdError) {
      return invalidIdError
    }

    const billExists = await this.getBillByIdUseCase.execute(input.params.id)
    if (!billExists) {
      return new InvalidParamError('bill not found')
    }

    const invalidStatusError = this.currentStatusValidation(billExists.bill.status)
    if (invalidStatusError) {
      return invalidStatusError
    }

    const invalidPaymentTypeError = this.paymentTypeValidation(input.body?.type)
    if (invalidPaymentTypeError) {
      return invalidPaymentTypeError
    }
  }

  private idValidation (id: string): Error | undefined {
    if (!id) {
      return new InvalidParamError('id')
    }
  }

  private currentStatusValidation (currentStatus: string): Error | undefined {
    const allowedStatusToUpdate = ['open', 'overdue']
    if (!allowedStatusToUpdate.includes(currentStatus)) {
      return new InvalidParamError('Bill status should be open or overdue')
    }
  }

  private paymentTypeValidation (type: string): Error | undefined {
    const allowedTypes = config.payment.types
    if (!type || !allowedTypes.includes(type)) {
      return new InvalidParamError('type')
    }
  }
}
