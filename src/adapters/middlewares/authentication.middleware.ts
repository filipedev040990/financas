import { TokenValidatorInterface } from '@/application/interfaces/token.interface'
import { forbidden, unauthorized } from '../helpers/http.helper'
import { HttpRequest, HttpResponse } from '../types/http.type'
import { GetUserByIdUseCaseInterface } from '@/application/interfaces/get-user-by-id.interface'

export class AuthenticationMiddleware {
  constructor (
    private readonly tokenValidator: TokenValidatorInterface,
    private readonly getUserByIdUseCase: GetUserByIdUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    if (input?.headers?.Authorization) {
      const token = input.headers.Authorization.split(' ')[1]

      const userId = this.tokenValidator.validate({ token })
      if (userId) {
        await this.getUserByIdUseCase.execute(userId)
      }
      return unauthorized()
    }
    return forbidden()
  }
}
