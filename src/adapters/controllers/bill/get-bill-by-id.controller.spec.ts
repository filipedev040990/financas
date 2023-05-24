import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import { GetBillByIdController } from './get-bill-by-id.controller'
import { HttpRequest } from '@/adapters/types/http.type'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const getBillByIdUseCase = mock<GetBillByIdUseCaseInterface>()

describe('GetBillByIdController', () => {
  let sut: GetBillByIdController
  let input: HttpRequest

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new GetBillByIdController(getBillByIdUseCase)
    getBillByIdUseCase.execute.mockResolvedValue({
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
    })
  })

  beforeEach(() => {
    input = {
      params: {
        id: 'any bill id'
      }
    }
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call GetBillByIdUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(getBillByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getBillByIdUseCase.execute).toHaveBeenCalledWith('any bill id')
  })

  test('should return null if GetBillByIdUseCase returns null', async () => {
    getBillByIdUseCase.execute.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: null
    })
  })

  test('should return a bill correctly', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: {
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
      }
    })
  })
})
