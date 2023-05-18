import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'
import { mock } from 'jest-mock-extended'

export class CalculateStatusBillUseCase {
  constructor (private readonly billRepository: GetBillByIdRepositoryInterface) {}
  async execute (input: CalculateStatusBillUseCaseInterface.Input): Promise<void> {
    if (input.billPaymentId) {
      await this.billRepository.getById(input.billPaymentId)
    }
  }
}

const billRepository = mock<GetBillByIdRepositoryInterface>()

describe('CalculateStatusBillUseCase', () => {
  let sut: CalculateStatusBillUseCase
  let input: CalculateStatusBillUseCaseInterface.Input

  beforeAll(() => {
    sut = new CalculateStatusBillUseCase(billRepository)
    input = {
      expiration: new Date(),
      billPaymentId: 'any bill paymentId'
    }
  })

  test('should call BillRepository.getById if id is provided', async () => {
    await sut.execute(input)

    expect(billRepository.getById).toHaveBeenCalledWith('any bill paymentId')
  })

  test('should not call BillRepository.getById if id is not provided', async () => {
    input.billPaymentId = undefined

    await sut.execute(input)

    expect(billRepository.getById).not.toBeCalled()
  })
})
