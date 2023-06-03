import { MissingParamError } from '@/adapters/errors'
import { badRequest, success } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { CreateCategoryUseCaseInterface } from '@/application/interfaces/create-category-usecase.interface'

export class CreateCategoryController {
  constructor (private readonly createCategoryUseCase: CreateCategoryUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<any> {
    if (!input.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    await this.createCategoryUseCase.execute(input.body.name)

    return success(201, null)
  }
}
