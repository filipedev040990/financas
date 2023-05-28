import { GetAllBillController } from '@/adapters/controllers/bill/get-all-bill.controller'
import { buildGetAllBillUseCase } from '../usecases/get-all-bill.factory'

export const buildGetAllBillController = (): GetAllBillController => {
  const getAllBillUseCase = buildGetAllBillUseCase()
  return new GetAllBillController(getAllBillUseCase)
}
