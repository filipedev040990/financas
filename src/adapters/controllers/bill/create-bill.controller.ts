import { badRequest, serverError, success } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { BillValidatorInterface } from '@/application/interfaces/bill-validation.interface'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { CreateBillUseCaseInterface } from '@/application/interfaces/create-bill-usecase.interface'

export class CreateBillController implements ControllerInterface {
  constructor (
    private readonly billValidator: BillValidatorInterface,
    private readonly calculateStatusBillUseCase: CalculateStatusBillUseCaseInterface,
    private readonly createBillUseCase: CreateBillUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const inputError = await this.billValidator.validate(input)
      if (inputError) {
        return badRequest(inputError)
      }

      const statusBill = await this.calculateStatusBillUseCase.execute({ expiration: new Date(input.body.expiration), totalValue: input.body.totalValue, billId: '' })

      const newBill = await this.createBillUseCase.execute({
        type: input.body.type,
        category_id: input.body.category_id,
        expiration: input.body.expiration,
        totalValue: input.body.totalValue,
        observation: input.body.observation,
        status: statusBill
      })

      return success(201, newBill)
    } catch (error) {
      return serverError(error)
    }
  }
}
