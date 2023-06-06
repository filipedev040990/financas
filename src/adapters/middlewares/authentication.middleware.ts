import { TokenValidatorInterface } from '@/application/interfaces/token.interface'
import { forbidden } from '../helpers/http.helper'
import { HttpRequest } from '../types/http.type'

export class AuthenticationMiddleware {
  constructor (private readonly tokenValidator: TokenValidatorInterface) {}
  async execute (input: HttpRequest): Promise<any> {
    if (input?.headers?.Authorization) {
      const token = input.headers.Authorization.split(' ')[1]

      this.tokenValidator.validate({ token })
    }
    return forbidden()
  }
}
