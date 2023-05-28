import { serverError, success } from '@/adapters/helpers/http.helper'
import { HttpResponse } from '@/adapters/types/http.type'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { GetAllBillUseCaseInterface } from '@/application/interfaces/get-all-bill.interface'

export class GetAllBillController implements ControllerInterface {
  constructor (private readonly getAllBillUseCase: GetAllBillUseCaseInterface) {}
  async execute (): Promise<HttpResponse> {
    try {
      const bills = await this.getAllBillUseCase.execute()
      return success(200, bills)
    } catch (error) {
      return serverError(error)
    }
  }
}
