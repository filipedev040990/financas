import { GetBillByIdController } from '@/adapters/controllers/bill/get-bill-by-id.controller'
import { buildGetBillByIdUseCase } from '../usecases/get-bill-by-id.factory'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { buildLogControllerDecorator } from './log-decorator.factory'

export const buildGetBillByIdController = (): ControllerInterface => {
  const getBillByIdUseCase = buildGetBillByIdUseCase()
  const controller = new GetBillByIdController(getBillByIdUseCase)
  return buildLogControllerDecorator(controller)
}
