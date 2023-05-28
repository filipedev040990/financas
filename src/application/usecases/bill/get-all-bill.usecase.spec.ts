import { GetAllBillRepositoryInterface } from '@/domain/interfaces/get-all-bill-repository.interface'
import { GetAllBillUseCase } from './get-all-bill.usecase'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const billRepository = mock<GetAllBillRepositoryInterface>()

describe('GetAllBillUseCase', () => {
  let sut: GetAllBillUseCase
  let output: GetAllBillRepositoryInterface.Output[]

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new GetAllBillUseCase(billRepository)
    output = [{
      bill: {
        id: 'any bill id',
        type: 'any type',
        category_id: 'any category id',
        expiration: new Date(),
        totalValue: 1000,
        observation: 'Test',
        status: 'open',
        created_at: new Date('2023-01-01')
      },
      BillPayment: {
        totalValue: 1000,
        interest: 0,
        discount: 0,
        paymentMethodId: 'any payment method id',
        reversed: false,
        created_at: new Date()
      }
    }]

    billRepository.getAllBill.mockResolvedValue(output)
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call BillRepository.getAllBill once', async () => {
    await sut.execute()

    expect(billRepository.getAllBill).toHaveBeenCalledTimes(1)
  })

  test('should return a bill correctly with bill payment', async () => {
    const output = await sut.execute()

    expect(output).toEqual([{
      bill: {
        id: 'any bill id',
        type: 'any type',
        category_id: 'any category id',
        expiration: new Date(),
        totalValue: 1000,
        observation: 'Test',
        status: 'open',
        created_at: new Date('2023-01-01'),
        updated_at: undefined
      },
      billPayment: {
        totalValue: 1000,
        interest: 0,
        discount: 0,
        paymentMethodId: 'any payment method id',
        reversed: false,
        paymentDate: new Date()
      }
    }])
  })

  test('should return a bill correctly without bill payment', async () => {
    billRepository.getAllBill.mockResolvedValueOnce([{
      bill: {
        id: 'any bill id',
        type: 'any type',
        category_id: 'any category id',
        expiration: new Date(),
        totalValue: 1000,
        observation: 'Test',
        status: 'open',
        created_at: new Date('2023-01-01')
      }
    }])

    const output = await sut.execute()

    expect(output).toEqual([{
      bill: {
        id: 'any bill id',
        type: 'any type',
        category_id: 'any category id',
        expiration: new Date(),
        totalValue: 1000,
        observation: 'Test',
        status: 'open',
        created_at: new Date('2023-01-01')
      }
    }])
  })

  test('should return null', async () => {
    billRepository.getAllBill.mockResolvedValueOnce(null)

    const output = await sut.execute()

    expect(output).toBeNull()
  })
})
