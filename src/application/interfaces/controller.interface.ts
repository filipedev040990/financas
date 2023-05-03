import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'

export interface ControllerInterface {
  execute: (input: HttpRequest) => Promise<HttpResponse>
}
