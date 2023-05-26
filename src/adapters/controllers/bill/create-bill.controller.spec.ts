import { badRequest, serverError } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { CreateBillController } from './create-bill.controller'
import { mock } from 'jest-mock-extended'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { CreateBillUseCaseInterface } from '@/application/interfaces/create-bill-usecase.interface'
import MockDate from 'mockdate'
import { BillValidatorInterface } from '@/application/interfaces/bill-validation.interface'
import { MissingParamError } from '@/adapters/errors'

const addDaysToDate = (date: Date, days: number): Date => {
  return new Date(date.setDate(date.getDate()) + days)
}

const calculateStatusBillUseCase = mock<CalculateStatusBillUseCaseInterface>()
const createBillUseCase = mock<CreateBillUseCaseInterface>()
const billValidator = mock<BillValidatorInterface>()

describe('CreateBillController', () => {
  let sut: CreateBillController
  let input: HttpRequest

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new CreateBillController(billValidator, calculateStatusBillUseCase, createBillUseCase)
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
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call BillValidator.validate once and with correct values', async () => {
    await sut.execute(input)

    expect(billValidator.validate).toHaveBeenCalledTimes(1)
    expect(billValidator.validate).toHaveBeenCalledWith(input)
  })

  test('should return 400 if BillValidator.validate return error', async () => {
    const error = new MissingParamError('test')
    billValidator.validate.mockResolvedValueOnce(error)

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
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
