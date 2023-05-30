import { UpdateRequestUseCase } from '@/application/usecases/request/update-request.usecase'
import { RequestRepository } from '@/infra/database/repositories/request-repository'

export const buildUpdateRequestUseCase = (): UpdateRequestUseCase => {
  const requestRepository = new RequestRepository()
  return new UpdateRequestUseCase(requestRepository)
}
