import { serverError } from '@/adapters/helpers/http.helper'
import { GetAllBillUseCaseInterface } from '@/application/interfaces/get-all-bill.interface'
import { GetAllBillController } from './get-all-bill.controller'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const getAllBillUseCase = mock<GetAllBillUseCaseInterface>()

describe('GetAllBillController', () => {
  let sut: GetAllBillController

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new GetAllBillController(getAllBillUseCase)
    getAllBillUseCase.execute.mockResolvedValue([{
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

  afterAll(() => {
    MockDate.reset()
  })

  test('should call GetBillByIdUseCase once', async () => {
    await sut.execute()

    expect(getAllBillUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return null if GetBillByIdUseCase returns null', async () => {
    getAllBillUseCase.execute.mockResolvedValueOnce(null)

    const output = await sut.execute()

    expect(output).toEqual({
      statusCode: 200,
      body: null
    })
  })

  test('should return a bill correctly', async () => {
    const output = await sut.execute()

    expect(output).toEqual({
      statusCode: 200,
      body: [{
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
      }]
    })
  })

  test('should throw if GetBillByIdUseCase throws', async () => {
    getAllBillUseCase.execute.mockImplementationOnce(() => { throw new Error() })

    const output = await sut.execute()

    expect(output).toEqual(serverError(new Error()))
  })
})
