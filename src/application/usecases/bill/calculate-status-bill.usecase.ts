import { InvalidParamError } from '@/adapters/errors'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'
import config from '@/infra/config'

export class CalculateStatusBillUseCase {
  public payment?: PaymentInput

  constructor (private readonly billRepository: GetBillByIdRepositoryInterface) {}

  async execute (input: CalculateStatusBillUseCaseInterface.Input): Promise<CalculateStatusBillUseCaseInterface.Output> {
    this.payment = null

    if (input.billPaymentId) {
      const payment = await this.billRepository.getById(input.billPaymentId)
      if (!payment) {
        throw new InvalidParamError('billPaymentId')
      }

      this.payment = payment
    }

    const expiration = input.expiration
    const today = new Date()

    if (!this.payment && (today <= expiration)) {
      return config.payment.status.open
    }

    return ''
  }
}

export type PaymentInput = {
  id: string
  type: string
  category_id: string
  expiration: Date
  interest: number
  discount: number
  total_value: number
  payment_method_id: string
  created_at: Date
  status: string
} | null
