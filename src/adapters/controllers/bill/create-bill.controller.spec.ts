import { InvalidParamError } from '@/adapters/errors'
import { badRequest, serverError } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { CreateBillController } from './create-bill.controller'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import { mock } from 'jest-mock-extended'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { CreateBillUseCaseInterface } from '@/application/interfaces/create-bill-usecase.interface'
import MockDate from 'mockdate'

const addDaysToDate = (date: Date, days: number): Date => {
  return new Date(date.setDate(date.getDate()) + days)
}

const categoryRepository = mock<GetCategoryByIdRepositoryInterface>()
const calculateStatusBillUseCase = mock<CalculateStatusBillUseCaseInterface>()
const createBillUseCase = mock<CreateBillUseCaseInterface>()

describe('CreateBillController', () => {
  let sut: CreateBillController
  let input: HttpRequest

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new CreateBillController(categoryRepository, calculateStatusBillUseCase, createBillUseCase)
    calculateStatusBillUseCase.execute.mockResolvedValue('open')
    createBillUseCase.execute.mockResolvedValue({
      id: 'any id',
      type: 'pay',
      category_id: 'any category id',
      expiration: addDaysToDate(new Date(), 1),
      totalValue: 100,
      observation: '',
      status: 'open',
      created_at: new Date()
    })
  })

  beforeEach(() => {
    input = {
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

  describe('paymentTypeValidation', () => {
    test('should call validation type once and with correct value', async () => {
      const spy = jest.spyOn(CreateBillController.prototype as unknown as keyof typeof CreateBillController, 'paymentTypeValidation')

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
      const spy = jest.spyOn(CreateBillController.prototype as unknown as keyof typeof CreateBillController, 'paymentCategoryValidation')

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
      const spy = jest.spyOn(CreateBillController.prototype as unknown as keyof typeof CreateBillController, 'paymentExpirationValidation')

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
      const spy = jest.spyOn(CreateBillController.prototype as unknown as keyof typeof CreateBillController, 'paymentTotalValueValidation')

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
    expect(calculateStatusBillUseCase.execute).toHaveBeenCalledWith({ expiration: input.body.expiration, totalValue: input.body.totalValue, billId: '' })
  })

  test('should call createBillUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(createBillUseCase.execute).toHaveBeenCalledTimes(1)
    expect(createBillUseCase.execute).toHaveBeenCalledWith({
      type: input.body.type,
      category_id: input.body.category_id,
      expiration: input.body.expiration,
      totalValue: input.body.totalValue,
      observation: input.body.observation ?? 0,
      status: 'open'
    })
  })

  test('should return 201 and a new bill', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 201,
      body: {
        id: 'any id',
        type: 'pay',
        category_id: 'any category id',
        expiration: addDaysToDate(new Date(), 1),
        totalValue: 100,
        observation: '',
        status: 'open',
        created_at: new Date()
      }
    })
  })

  test('should return 500 if CreateBillUseCase throws', async () => {
    createBillUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(new Error()))
  })
})
