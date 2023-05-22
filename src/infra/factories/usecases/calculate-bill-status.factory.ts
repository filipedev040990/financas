import { CalculateStatusBillUseCase } from '@/application/usecases/bill/calculate-status-bill.usecase'
import { BillPaymentRepositoy } from '@/infra/database/repositories/bill-payment.repository'

export const buildCalculateBillStatusUseCase = (): CalculateStatusBillUseCase => {
  const billPaymentRepository = new BillPaymentRepositoy()
  return new CalculateStatusBillUseCase(billPaymentRepository)
}
