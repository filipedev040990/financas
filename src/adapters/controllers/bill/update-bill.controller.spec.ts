import { InvalidParamError } from '@/adapters/errors'
import { badRequest, serverError } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import { UpdateBillController } from './update-bill.controller'
import { UpdateBillUseCaseInterface } from '@/application/interfaces/update-bill-usecase.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const addDaysToDate = (date: Date, days: number): Date => {
  return new Date(date.setDate(date.getDate()) + days)
}

const categoryRepository = mock<GetCategoryByIdRepositoryInterface>()
const calculateStatusBillUseCase = mock<CalculateStatusBillUseCaseInterface>()
const getBillByIdUseCase = mock<GetBillByIdUseCaseInterface>()
const updateBillUseCase = mock<UpdateBillUseCaseInterface>()

describe('UpdateBillController', () => {
  let sut: UpdateBillController
  let input: HttpRequest

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateBillController(getBillByIdUseCase, categoryRepository, calculateStatusBillUseCase, updateBillUseCase)
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

    updateBillUseCase.execute.mockResolvedValue({
      id: 'any id',
      type: 'pay',
      category_id: 'any category id',
      expiration: new Date(),
      totalValue: 100,
      observation: '',
      status: 'open',
      created_at: new Date(),
      updated_at: new Date()
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

  afterAll(() => {
    MockDate.reset()
  })

  describe('idValidatoin', () => {
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
  })

  describe('currentStatusValidation', () => {
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

  describe('paymentTypeValidation', () => {
    test('should call validation type once and with correct value', async () => {
      const spy = jest.spyOn(UpdateBillController.prototype as unknown as keyof typeof UpdateBillController, 'paymentTypeValidation')

      await sut.execute(input)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith('pay')
    })

    test('should return 400 if validation type fails', async () => {
      input.body.type = null

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('type')))
    })

    test('should return 400 if validation type fails', async () => {
      input.body.type = 'invalid type'

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('type')))
    })
  })

  describe('paymentCategoryValidation', () => {
    test('should call paymentCategoryValidation once and with correct value', async () => {
      const spy = jest.spyOn(UpdateBillController.prototype as unknown as keyof typeof UpdateBillController, 'paymentCategoryValidation')

      await sut.execute(input)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith('any category id')
    })

    test('should return 400 if validation category fails', async () => {
      input.body.category_id = null

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('category')))
    })

    test('should call CategoryRepository.getById once and with correct category id', async () => {
      await sut.execute(input)

      expect(categoryRepository.getById).toHaveBeenCalledTimes(1)
      expect(categoryRepository.getById).toHaveBeenCalledWith('any category id')
    })

    test('should return 400 if validation category fails', async () => {
      jest.spyOn(categoryRepository, 'getById').mockResolvedValueOnce(null)

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('category')))
    })
  })

  describe('paymentExpirationValidation', () => {
    test('should call paymentExpirationValidation once and with correct value', async () => {
      const spy = jest.spyOn(UpdateBillController.prototype as unknown as keyof typeof UpdateBillController, 'paymentExpirationValidation')

      await sut.execute(input)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(input.body.expiration)
    })

    test('should return 400 if expiration is not provided', async () => {
      input.body.expiration = null

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('expiration')))
    })
  })

  describe('paymentTotalValueValidation', () => {
    test('should call paymentTotalValueValidation once and with correct total value', async () => {
      const spy = jest.spyOn(UpdateBillController.prototype as unknown as keyof typeof UpdateBillController, 'paymentTotalValueValidation')

      await sut.execute(input)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(input.body.totalValue)
    })

    test('should return 400 if totalValue is not provided', async () => {
      input.body.totalValue = null

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('totalValue')))
    })

    test('should return 400 if totalValue is less than 1', async () => {
      input.body.totalValue = 0

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('totalValue')))
    })
  })

  test('should call calculateBillStatusUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(calculateStatusBillUseCase.execute).toHaveBeenCalledTimes(1)
    expect(calculateStatusBillUseCase.execute).toHaveBeenCalledWith({ expiration: input.body.expiration, totalValue: input.body.totalValue, billId: 'any bill id' })
  })

  test('should call updateBillUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(updateBillUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateBillUseCase.execute).toHaveBeenCalledWith({
      id: input.params.id,
      type: input.body.type,
      category_id: input.body.category_id,
      expiration: input.body.expiration,
      totalValue: input.body.totalValue,
      observation: input.body.observation ?? 0,
      status: 'open',
      updated_at: new Date()
    })
  })

  test('should return 200 and a updated bill', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: {
        id: 'any id',
        type: 'pay',
        category_id: 'any category id',
        expiration: new Date(),
        totalValue: 100,
        observation: '',
        status: 'open',
        created_at: new Date(),
        updated_at: new Date()
      }
    })
  })

  test('should return 500 if UpdateBillUseCase throws', async () => {
    updateBillUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(new Error()))
  })
})
