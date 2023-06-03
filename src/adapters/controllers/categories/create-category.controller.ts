import { MissingParamError } from '@/adapters/errors'
import { badRequest } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'

export class CreateCategoryController {
  async execute (input: HttpRequest): Promise<any> {
    if (!input.body.name) {
      return badRequest(new MissingParamError('name'))
    }
  }
}
