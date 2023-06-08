import { MissingParamError } from '@/adapters/errors'
import { badRequest } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'

export class AuthenticateUserController {
  async execute (input: HttpRequest): Promise<any> {
    const error = this.validate(input)
    if (error) {
      return badRequest(error)
    }
    return null
  }

  private validate (input: HttpRequest): Error | undefined {
    const requiredFields = ['login', 'password']
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return new MissingParamError(field)
      }
    }
  }
}
