import { HttpRequest } from '@/adapters/types/http.type'

export interface BillValidatorInterface {
  validate (input: HttpRequest): Promise<Error | undefined>
}
