import { InvalidParamError } from '@/adapters/errors'
import { badRequest } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import { UpdateBillController } from './update-bill.controller'
import { mock } from 'jest-mock-extended'

const addDaysToDate = (date: Date, days: number): Date => {
  return new Date(date.setDate(date.getDate()) + days)
}

const categoryRepository = mock<GetCategoryByIdRepositoryInterface>()
const calculateStatusBillUseCase = mock<CalculateStatusBillUseCaseInterface>()
const getBillByIdUseCase = mock<GetBillByIdUseCaseInterface>()

describe('UpdateBillController', () => {
  let sut: UpdateBillController
  let input: HttpRequest

  beforeAll(() => {
    sut = new UpdateBillController(getBillByIdUseCase)
    calculateStatusBillUseCase.execute.mockResolvedValue('open')
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
      },
      body: {
        type: 'pay',
        category_id: 'any category id',
        expiration: addDaysToDate(new Date(), 1),
        totalValue: 100,
        observation: ''
      }
    }
    categoryRepository.getById.mockResolvedValue({
      id: 'any id',
      name: 'any name'
    })
  })

  test('should return 400 if bill id does not provided', async () => {
    input.params.id = null

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new InvalidParamError('id')))
  })

  test('should call GetBillByIdUseCase.execute once and with correct id', async () => {
    await sut.execute(input)

    expect(getBillByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getBillByIdUseCase.execute).toHaveBeenCalledWith(input.params.id)
  })

  test('should return 400 if GetBillByIdUseCase.execute returns null', async () => {
    getBillByIdUseCase.execute.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new InvalidParamError('bill not found')))
  })

  test('should return 400 if current bill status does not open or overdue', async () => {
    getBillByIdUseCase.execute.mockResolvedValueOnce({
      bill: {
        id: 'any bill id',
        type: 'any type',
        category_id: 'any category id',
        expiration: new Date(),
        totalValue: 1000,
        observation: 'Test',
        status: 'paid',
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

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new InvalidParamError('Bill status should be open or overdue')))
  })
})
