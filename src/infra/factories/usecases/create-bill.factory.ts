import { CreateBillUseCase } from '@/application/usecases/bill/create-bill.usecase'
import { UUIDAdapter } from '@/infra/adapters/uuid.adapter'
import { BillRepository } from '@/infra/database/repositories/bill.repository'

export const buildCreateBillUseCase = (): CreateBillUseCase => {
  const uuidGenerator = new UUIDAdapter()
  const billRepository = new BillRepository()
  return new CreateBillUseCase(uuidGenerator, billRepository)
}
