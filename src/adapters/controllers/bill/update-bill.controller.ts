import { badRequest, serverError, success } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { BillValidatorInterface } from '@/application/interfaces/bill-validation.interface'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { UpdateBillUseCaseInterface } from '@/application/interfaces/update-bill-usecase.interface'

export class UpdateBillController {
  constructor (
    private readonly billValidator: BillValidatorInterface,
    private readonly calculateStatusBillUseCase: CalculateStatusBillUseCaseInterface,
    private readonly updateBillUseCase: UpdateBillUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const inputError = await this.billValidator.validate(input)
      if (inputError) {
        return badRequest(inputError)
      }

      const statusBill = await this.calculateStatusBillUseCase.execute({ expiration: new Date(input.body.expiration), totalValue: input.body.totalValue, billId: input.params.id })

      const updatedBill = await this.updateBillUseCase.execute({
        id: input.params.id,
        type: input.body.type,
        category_id: input.body.category_id,
        expiration: input.body.expiration,
        totalValue: input.body.totalValue,
        observation: input.body.observation,
        status: statusBill,
        updated_at: new Date()
      })

      return success(200, updatedBill)
    } catch (error) {
      return serverError(error)
    }
  }
}
