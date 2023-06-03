import { MissingParamError } from '@/adapters/errors'
import { badRequest, serverError, success } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { CreateCategoryUseCaseInterface } from '@/application/interfaces/create-category-usecase.interface'

export class CreateCategoryController {
  constructor (private readonly createCategoryUseCase: CreateCategoryUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    if (!input.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    try {
      await this.createCategoryUseCase.execute(input.body.name)
      return success(201, null)
    } catch (error) {
      return serverError(error)
    }
  }
}
