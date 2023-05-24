import { GetBillByIdUseCase } from '@/application/usecases/bill/get-bill-by-id.usecase'
import { BillRepository } from '@/infra/database/repositories/bill.repository'

export const buildGetBillByIdUseCase = (): GetBillByIdUseCase => {
  const billRepository = new BillRepository()
  return new GetBillByIdUseCase(billRepository)
}
