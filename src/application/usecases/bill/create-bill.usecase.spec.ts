import { CreateBillUseCaseInterface } from '@/application/interfaces/create-bill-usecase.interface'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'
import { CreateBillRepositoryInterface } from '@/domain/interfaces/create-bill-repository.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { CreateBillUseCase } from './create-bill.usecase'

const billRepository = mock<CreateBillRepositoryInterface>()
billRepository.create.mockResolvedValue({
  id: ' any id',
  type: 'any type',
  category_id: 'any category_id',
  expiration: new Date('2023-01-01'),
  interest: 0,
  discount: 0,
  totalValue: 1000,
  payment_method_id: 'any payment method',
  created_at: new Date('2023-01-01'),
  status: 'open'
})

const uuidGenerator = mock<UUIDGeneratorInterface>()
uuidGenerator.execute.mockReturnValue('any uuid')

describe('CreateBillUseCase', () => {
  let sut: CreateBillUseCase
  let input: CreateBillUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date('2023-01-01'))

    sut = new CreateBillUseCase(uuidGenerator, billRepository)
    input = {
      type: 'any type',
      category_id: 'any category_id',
      expiration: new Date('2023-01-01'),
      discount: 0,
      interest: 0,
      payment_method_id: 'any payment method',
      totalValue: 1000,
      status: 'open'
    }
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call BillRepository.create once and with correct values', async () => {
    await sut.execute(input)

    expect(billRepository.create).toHaveBeenCalledTimes(1)
    expect(billRepository.create).toHaveBeenCalledWith({
      id: 'any uuid',
      type: 'any type',
      category_id: 'any category_id',
      expiration: new Date('2023-01-01'),
      discount: 0,
      interest: 0,
      observation: null,
      payment_method_id: 'any payment method',
      totalValue: 1000,
      created_at: new Date('2023-01-01'),
      status: 'open'
    })
  })

  test('should return an bill', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      id: ' any id',
      type: 'any type',
      category_id: 'any category_id',
      expiration: new Date('2023-01-01'),
      interest: 0,
      discount: 0,
      totalValue: 1000,
      payment_method_id: 'any payment method',
      created_at: new Date('2023-01-01'),
      status: 'open'
    })
  })
})
