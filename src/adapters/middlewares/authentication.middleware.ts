import { TokenValidatorInterface } from '@/application/interfaces/token.interface'
import { forbidden, unauthorized } from '../helpers/http.helper'
import { HttpRequest, HttpResponse } from '../types/http.type'

export class AuthenticationMiddleware {
  constructor (private readonly tokenValidator: TokenValidatorInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    if (input?.headers?.Authorization) {
      const token = input.headers.Authorization.split(' ')[1]

      const isValidToken = this.tokenValidator.validate({ token })
      if (!isValidToken) {
        return unauthorized()
      }
    }
    return forbidden()
  }
}
