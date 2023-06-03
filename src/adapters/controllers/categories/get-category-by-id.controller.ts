import { serverError, success } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { GetCategoryByIdUseCaseInterface } from '@/application/interfaces/get-category-by-id.interface'

export class GetCategoryByIdController {
  constructor (private readonly getCategoryByIdUseCase: GetCategoryByIdUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const category = await this.getCategoryByIdUseCase.execute(input.params.id)
      return success(200, category)
    } catch (error) {
      return serverError(error)
    }
  }
}
