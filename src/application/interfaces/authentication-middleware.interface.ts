import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'

export interface AuthenticationMiddlewareInterface {
  execute (input: HttpRequest): Promise<HttpResponse>
}
