import { serverError, success } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'

export class GetBillByIdController implements ControllerInterface {
  constructor (private readonly getBillByIdUseCase: GetBillByIdUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const bill = await this.getBillByIdUseCase.execute(input.params.id)
      return success(200, bill)
    } catch (error) {
      return serverError(error)
    }
  }
}
