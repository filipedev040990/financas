import { serverError, success } from '@/adapters/helpers/http.helper'
import { HttpResponse } from '@/adapters/types/http.type'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { GetAllCategoriesUseCaseInterface } from '@/application/interfaces/get-all-categories-usecase.interface'

export class GetAllCategoriesController implements ControllerInterface {
  constructor (private readonly getAllCategoriesUseCase: GetAllCategoriesUseCaseInterface) {}
  async execute (): Promise<HttpResponse> {
    try {
      const categories = await this.getAllCategoriesUseCase.execute()
      return success(200, categories ?? [])
    } catch (error) {
      return serverError(error)
    }
  }
}
