import { GetAllBillUseCase } from '@/application/usecases/bill/get-all-bill.usecase'
import { BillRepository } from '@/infra/database/repositories/bill.repository'

export const buildGetAllBillUseCase = (): GetAllBillUseCase => {
  const billRepository = new BillRepository()
  return new GetAllBillUseCase(billRepository)
}
