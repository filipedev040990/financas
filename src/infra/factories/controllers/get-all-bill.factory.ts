import { GetAllBillController } from '@/adapters/controllers/bill/get-all-bill.controller'
import { buildGetAllBillUseCase } from '../usecases/get-all-bill.factory'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { buildLogControllerDecorator } from './log-decorator.factory'

export const buildGetAllBillController = (): ControllerInterface => {
  const getAllBillUseCase = buildGetAllBillUseCase()
  const controller = new GetAllBillController(getAllBillUseCase)
  return buildLogControllerDecorator(controller)
}
