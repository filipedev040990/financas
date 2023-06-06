import { TokenValidatorInterface } from '@/application/interfaces/token.interface'
import { forbidden, success, unauthorized } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { GetUserByIdUseCaseInterface } from '@/application/interfaces/get-user-by-id.interface'
import { AuthenticationMiddlewareInterface } from '@/application/interfaces/authentication-middleware.interface'

export class AuthenticationMiddleware implements AuthenticationMiddlewareInterface {
  constructor (
    private readonly tokenValidator: TokenValidatorInterface,
    private readonly getUserByIdUseCase: GetUserByIdUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    if (input?.headers?.authorization) {
      const token = input.headers.authorization.split('Bearer ')[1]

      const userId = this.tokenValidator.validate({ token })
      if (userId) {
        const userAccount = await this.getUserByIdUseCase.execute(userId)
        if (userAccount) {
          return success(200, userAccount.id)
        }
      }
      return unauthorized()
    }
    return forbidden()
  }
}
