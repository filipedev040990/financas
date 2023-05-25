import { InvalidParamError } from '@/adapters/errors'
import { badRequest } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'

export class UpdateBillController {
  constructor (
    private readonly getBillByIdUseCase: GetBillByIdUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    if (!input.params?.id) {
      return badRequest(new InvalidParamError('id'))
    }

    const billExists = await this.getBillByIdUseCase.execute(input.params.id)
    if (!billExists) {
      return badRequest(new InvalidParamError('bill not found'))
    }

    const allowedStatusToUpdate = ['open', 'overdue']
    const currentStatus = billExists.bill.status
    if (!allowedStatusToUpdate.includes(currentStatus)) {
      return badRequest(new InvalidParamError('Bill status should be open or overdue'))
    }
  }
}
