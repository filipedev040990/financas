import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'
import config from '@/infra/config'

export type PaymentOutput = {
  id: string
  type: string
  category_id: string
  expiration: Date
  interest: number
  discount: number
  totalValue: number
  payment_method_id: string
  created_at: Date
  status: string
} | null
export class CalculateStatusBillUseCase {
  constructor (private readonly billRepository: GetBillByIdRepositoryInterface) {}

  async execute (input: CalculateStatusBillUseCaseInterface.Input): Promise<CalculateStatusBillUseCaseInterface.Output> {
    let { expiration, totalValue } = input
    const today = new Date()

    const payment: PaymentOutput = await this.billRepository.getByBillId(input.billId) ?? null

    if (payment) {
      totalValue -= payment.discount
      return payment.totalValue >= totalValue ? config.payment.status.totalPaid : config.payment.status.parcialPaid
    }

    return expiration < today ? config.payment.status.overdue : config.payment.status.open
  }
}
