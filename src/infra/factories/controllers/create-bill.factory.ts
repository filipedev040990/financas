import { CreateBillController } from '@/adapters/controllers/bill/create-bill.controller'
import { buildCalculateBillStatusUseCase } from '../usecases/calculate-bill-status.factory'
import { buildCreateBillUseCase } from '../usecases/create-bill.factory'
import { buildValidatorBill } from '../helpers/bill-validation.factory'
import { LogControllerDecorator } from '@/adapters/controllers/log-controller.decorator'
import { ControllerInterface } from '@/application/interfaces/controller.interface'

export const buildCreateBillController = (): ControllerInterface => {
  const billValidator = buildValidatorBill()
  const calculateBillStatusUseCase = buildCalculateBillStatusUseCase()
  const createBillUseCase = buildCreateBillUseCase()
  const controller = new CreateBillController(billValidator, calculateBillStatusUseCase, createBillUseCase)
  return new LogControllerDecorator(controller)
}
