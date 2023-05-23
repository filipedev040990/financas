import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'
import { GetBillByIdUseCase } from './get-bill-by-id.usecase'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const billRepository = mock<GetBillByIdRepositoryInterface>()

describe('GetBillByIdUseCase', () => {
  let sut: GetBillByIdUseCase
  let output: GetBillByIdRepositoryInterface.Output

  beforeAll(() => {
    MockDate.set(new Date())
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
      billPayment: {
        totalValue: 1000,
        interest: 0,
        discount: 0,
        paymentMethodId: 'any payment method id',
        reversed: false,
        created_at: new Date()
      }
    }

    billRepository.getByBillId.mockResolvedValue(output)
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call BillRepository.getByBillId once and with correct id', async () => {
    await sut.execute('any bill id')

    expect(billRepository.getByBillId).toHaveBeenCalledTimes(1)
    expect(billRepository.getByBillId).toHaveBeenCalledWith('any bill id')
  })

  test('should return a bill correctly with bill payment', async () => {
    const output = await sut.execute('any bill id')

    expect(output).toEqual({
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
      billPayment: {
        totalValue: 1000,
        interest: 0,
        discount: 0,
        paymentMethodId: 'any payment method id',
        reversed: false,
        paymentDate: new Date()
      }
    })
  })

  test('should return a bill correctly without bill payment', async () => {
    billRepository.getByBillId.mockResolvedValueOnce({
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
    })

    const output = await sut.execute('any bill id')

    expect(output).toEqual({
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
    })
  })

  test('should return null', async () => {
    billRepository.getByBillId.mockResolvedValueOnce(null)

    const output = await sut.execute('any bill id')

    expect(output).toBeNull()
  })
})
