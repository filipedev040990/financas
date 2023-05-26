import { badRequest, serverError } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { UpdateBillController } from './update-bill.controller'
import { UpdateBillUseCaseInterface } from '@/application/interfaces/update-bill-usecase.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { BillValidatorInterface } from '@/application/interfaces/bill-validation.interface'
import { MissingParamError } from '@/adapters/errors'

const addDaysToDate = (date: Date, days: number): Date => {
  return new Date(date.setDate(date.getDate()) + days)
}

const calculateStatusBillUseCase = mock<CalculateStatusBillUseCaseInterface>()
const updateBillUseCase = mock<UpdateBillUseCaseInterface>()
const billValidator = mock<BillValidatorInterface>()

describe('UpdateBillController', () => {
  let sut: UpdateBillController
  let input: HttpRequest

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateBillController(billValidator, calculateStatusBillUseCase, updateBillUseCase)
    calculateStatusBillUseCase.execute.mockResolvedValue('open')

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

    billValidator.validate.mockResolvedValue(undefined)
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
