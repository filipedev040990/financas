import { TokenValidatorInterface } from '@/application/interfaces/token.interface'
import { forbidden, success, unauthorized } from '../helpers/http.helper'
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
