import { InvalidParamError } from '@/adapters/errors'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'
import config from '@/infra/config'

export class CalculateStatusBillUseCase {
  constructor (private readonly billRepository: GetBillByIdRepositoryInterface) {}

  async execute (input: CalculateStatusBillUseCaseInterface.Input): Promise<CalculateStatusBillUseCaseInterface.Output> {
    let payment: PaymentOutput = null
    const totalValue = input.total_value
    const expiration = input.expiration
    const today = new Date()

    if (input.billPaymentId) {
      const paymentRegister = await this.billRepository.getById(input.billPaymentId)
      if (!paymentRegister) {
        throw new InvalidParamError('billPaymentId')
      }

      payment = paymentRegister

      if (payment.total_value >= totalValue || (payment.total_value <= totalValue && payment.discount > 0)) {
        return config.payment.status.paid
      }
    }

    if (!payment && (today <= expiration)) {
      return config.payment.status.open
    }

    return ''
  }
}

export type PaymentOutput = {
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
