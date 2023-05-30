import { SaveRequestUseCase } from '@/application/usecases/request/save-request.usecase'
import { UUIDAdapter } from '@/infra/adapters/uuid.adapter'
import { RequestRepository } from '@/infra/database/repositories/request-repository'

export const buildSaveRequestUseCase = (): SaveRequestUseCase => {
  const uuidGenerator = new UUIDAdapter()
  const requestRepository = new RequestRepository()
  return new SaveRequestUseCase(uuidGenerator, requestRepository)
}
