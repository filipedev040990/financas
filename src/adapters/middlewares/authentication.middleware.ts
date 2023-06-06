import { forbidden } from '../helpers/http.helper'
import { HttpRequest, HttpResponse } from '../types/http.type'

export class AuthenticationMiddleware {
  async execute (input: HttpRequest): Promise<HttpResponse> {
    return forbidden()
  }
}
