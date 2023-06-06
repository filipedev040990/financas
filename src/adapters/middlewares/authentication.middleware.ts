import { forbidden } from '../helpers/http.helper'
import { HttpRequest } from '../types/http.type'

export class AuthenticationMiddleware {
  async execute (input: HttpRequest): Promise<any> {
    if (!input?.headers || !input?.headers?.Authorization) {
      return forbidden()
    }
  }
}
