import { serverError, success } from '@/adapters/helpers/http.helper'
import { GetAllCategoriesUseCaseInterface } from '@/application/interfaces/get-all-categories-usecase.interface'

export class GetAllCategoriesController {
  constructor (private readonly getAllCategoriesUseCase: GetAllCategoriesUseCaseInterface) {}
  async execute (): Promise<any> {
    try {
      const categories = await this.getAllCategoriesUseCase.execute()
      return success(200, categories ?? [])
    } catch (error) {
      return serverError(error)
    }
  }
}
