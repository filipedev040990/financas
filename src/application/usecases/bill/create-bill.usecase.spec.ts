import { CreateBillUseCaseInterface } from '@/application/interfaces/create-bill-usecase.interface'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'
import { BillRepositoryInterface } from '@/domain/interfaces/bill-repository.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { CreateBillUseCase } from './create-bill.usecase'

const billRepository = mock<BillRepositoryInterface>()
billRepository.create.mockResolvedValue({
  id: ' any id',
  type: 'any type',
  category: 'any category',
  expiration: new Date('2023-01-01'),
  interest: 0,
  discount: 0,
  total_value: 1000,
  payment_method: 'any payment method',
  occurence: 'any ocurrence',
  createdAt: new Date('2023-01-01')
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
      category: 'any category',
      expiration: new Date('2023-01-01'),
      discount: 0,
      interest: 0,
      occurence: 'any ocurrence',
      payment_method: 'any payment method',
      total_value: 1000
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
      category: 'any category',
      expiration: new Date('2023-01-01'),
      discount: 0,
      interest: 0,
      occurence: 'any ocurrence',
      payment_method: 'any payment method',
      total_value: 1000,
      createdAt: new Date('2023-01-01')
    })
  })

  test('should return an bill', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      id: ' any id',
      type: 'any type',
      category: 'any category',
      expiration: new Date('2023-01-01'),
      interest: 0,
      discount: 0,
      total_value: 1000,
      payment_method: 'any payment method',
      occurence: 'any ocurrence',
      createdAt: new Date('2023-01-01')
    })
  })
})
