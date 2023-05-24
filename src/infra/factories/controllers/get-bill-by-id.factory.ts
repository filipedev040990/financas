import { GetBillByIdController } from '@/adapters/controllers/bill/get-bill-by-id.controller'
import { buildGetBillByIdUseCase } from '../usecases/get-bill-by-id.factory'

export const buildGetBillByIdController = (): GetBillByIdController => {
  const getBillByIdUseCase = buildGetBillByIdUseCase()
  return new GetBillByIdController(getBillByIdUseCase)
}
