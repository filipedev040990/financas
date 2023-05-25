import { UpdateBillUseCaseInterface } from '@/application/interfaces/update-bill-usecase.interface'
import { UpdateBillRepositoryInterface } from '@/domain/interfaces/update-bill-repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

export class UpdateBillUseCase {
  constructor (private readonly billRepository: UpdateBillRepositoryInterface) {}
  async execute (input: UpdateBillUseCaseInterface.Input): Promise<UpdateBillUseCaseInterface.Output> {
    return await this.billRepository.update(input)
  }
}

const billRepository = mock<UpdateBillRepositoryInterface>()

describe('UpdateBillUseCase', () => {
  let sut: UpdateBillUseCase
  let input: UpdateBillUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateBillUseCase(billRepository)
    input = {
      id: 'any bill id',
      type: 'any type',
      category_id: 'any category_id',
      expiration: new Date('2023-01-01'),
      totalValue: 1000,
      status: 'open',
      updated_at: new Date()
    }

    billRepository.update.mockResolvedValue({
      id: 'any bill id',
      type: 'any type',
      category_id: 'any category_id',
      expiration: new Date('2023-01-01'),
      totalValue: 1000,
      status: 'open',
      created_at: new Date('2023-01-01'),
      updated_at: new Date()
    })
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call BillRepository once and with correct values', async () => {
    await sut.execute(input)

    expect(billRepository.update).toHaveBeenCalledTimes(1)
    expect(billRepository.update).toHaveBeenCalledWith({
      id: 'any bill id',
      type: 'any type',
      category_id: 'any category_id',
      expiration: new Date('2023-01-01'),
      totalValue: 1000,
      status: 'open',
      updated_at: new Date()
    })
  })

  test('should return a updated bill', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      id: 'any bill id',
      type: 'any type',
      category_id: 'any category_id',
      expiration: new Date('2023-01-01'),
      totalValue: 1000,
      status: 'open',
      created_at: new Date('2023-01-01'),
      updated_at: new Date()
    })
  })
})
