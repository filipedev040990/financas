import { MissingParamError } from '@/adapters/errors'
import { badRequest, success } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { AuthenticateUserUseCaseInterface } from '@/application/interfaces/authenticate-user-usecase.interface'

export class AuthenticateUserController {
  constructor (private readonly authenticateUserUseCase: AuthenticateUserUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<any> {
    const error = this.validate(input)
    if (error) {
      return badRequest(error)
    }

    const token = await this.authenticateUserUseCase.execute(input.body)
    return success(200, { token })
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
