import { MissingParamError } from '@/adapters/errors'
import { badRequest, serverError, success, unauthorized } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { AuthenticateUserUseCaseInterface } from '@/application/interfaces/authenticate-user-usecase.interface'
import { ControllerInterface } from '@/application/interfaces/controller.interface'

export class AuthenticateUserController implements ControllerInterface {
  constructor (private readonly authenticateUserUseCase: AuthenticateUserUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validate(input)
      if (error) {
        return badRequest(error)
      }

      const token = await this.authenticateUserUseCase.execute(input.body)
      return token ? success(200, { token }) : unauthorized()
    } catch (error) {
      return serverError(error)
    }
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
