import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillPaymentByBillIdRepositoryInterface } from '@/domain/interfaces/get-bill-payment-by-billdd-repository.interface'
import config from '@/infra/config'

export class CalculateStatusBillUseCase {
  constructor (private readonly billPaymentRepository: GetBillPaymentByBillIdRepositoryInterface) {}

  async execute (input: CalculateStatusBillUseCaseInterface.Input): Promise<CalculateStatusBillUseCaseInterface.Output> {
    let { expiration, totalValue } = input
    const today = new Date()

    const payment: GetBillPaymentByBillIdRepositoryInterface.Output = await this.billPaymentRepository.getByBillId(input.billId) ?? null

    if (payment) {
      if (payment.reversed) {
        return config.payment.status.reversed
      }

      totalValue -= payment.discount
      return payment.totalValue >= totalValue ? config.payment.status.totalPaid : config.payment.status.parcialPaid
    }

    return expiration < today ? config.payment.status.overdue : config.payment.status.open
  }
}
