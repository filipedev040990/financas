import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'
import { mock } from 'jest-mock-extended'

export class GetBillByIdUseCase {
  constructor (private readonly billRepository: GetBillByIdRepositoryInterface) {}
  async execute (id: string): Promise<void> {
    await this.billRepository.getByBillId(id)
  }
}

const billRepository = mock<GetBillByIdRepositoryInterface>()

describe('GetBillByIdUseCase', () => {
  let sut: GetBillByIdUseCase
  let output: GetBillByIdUseCaseInterface.Output

  beforeAll(() => {
    sut = new GetBillByIdUseCase(billRepository)
    output = {
      bill: {
        id: 'any bill id',
        type: 'any type',
        category_id: 'any category id',
        expiration: new Date(),
        total_value: 1000,
        observation: 'Test',
        status: 'open',
        created_at: new Date('2023-01-01')
      },
      billPayment: null
    }

    billRepository.getByBillId.mockResolvedValue(output)
  })

  test('should call BillRepository.getByBillId once and with correct id', async () => {
    await sut.execute('any bill id')

    expect(billRepository.getByBillId).toHaveBeenCalledTimes(1)
    expect(billRepository.getByBillId).toHaveBeenCalledWith('any bill id')
  })
})
