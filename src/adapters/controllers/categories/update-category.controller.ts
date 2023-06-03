import { InvalidParamError, MissingParamError } from '@/adapters/errors'
import { badRequest, serverError, success } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { GetCategoryByIdUseCaseInterface } from '@/application/interfaces/get-category-by-id.interface'
import { UpdateCategoryUseCaseInterface } from '@/application/interfaces/update-category-usecase.interface'

export class UpdateCategoryController {
  constructor (
    private readonly updateCategoryUseCase: UpdateCategoryUseCaseInterface,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCaseInterface) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    if (!input.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    try {
      const categoryExists = await this.getCategoryByIdUseCase.execute(input.params.id)
      if (!categoryExists) {
        return badRequest(new InvalidParamError('id'))
      }

      await this.updateCategoryUseCase.execute({
        id: input.params.id,
        name: input.body.name
      })
      return success(201, {})
    } catch (error) {
      return serverError(error)
    }
  }
}
