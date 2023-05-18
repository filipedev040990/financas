import { InvalidParamError } from '@/adapters/errors'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'

export class CalculateStatusBillUseCase {
  constructor (private readonly billRepository: GetBillByIdRepositoryInterface) {}
  async execute (input: CalculateStatusBillUseCaseInterface.Input): Promise<void> {
    if (input.billPaymentId) {
      const payment = await this.billRepository.getById(input.billPaymentId)
      if (!payment) {
        throw new InvalidParamError('billPaymentId')
      }
    }
  }
}
