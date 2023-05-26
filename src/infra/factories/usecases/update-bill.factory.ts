import { UpdateBillUseCase } from '@/application/usecases/bill/update-bill.usecase'
import { BillRepository } from '@/infra/database/repositories/bill.repository'

export const buildUpdateBillUseCase = (): UpdateBillUseCase => {
  const billRepository = new BillRepository()
  return new UpdateBillUseCase(billRepository)
}
