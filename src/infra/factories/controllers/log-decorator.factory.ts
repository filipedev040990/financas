import { LogControllerDecorator } from '@/adapters/controllers/log-controller.decorator'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { buildSaveRequestUseCase } from '../usecases/save-request.factory'
import { buildUpdateRequestUseCase } from '../usecases/update-request.factory'

export const buildLogControllerDecorator = (controller: ControllerInterface): LogControllerDecorator => {
  const saveRequestUseCase = buildSaveRequestUseCase()
  const updateRequestUseCase = buildUpdateRequestUseCase()
  return new LogControllerDecorator(saveRequestUseCase, updateRequestUseCase, controller)
}
