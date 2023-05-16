import { InvalidParamError } from '@/adapters/errors'
import { badRequest } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { CreateBillController } from './create-bill.controller'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/category-repository.interface'
import { mock } from 'jest-mock-extended'

const addDaysToDate = (date: Date, days: number): Date => {
  return new Date(date.setDate(date.getDate()) + days)
}

const categoryRepository = mock<GetCategoryByIdRepositoryInterface>()

describe('CreateBillController', () => {
  let sut: CreateBillController
  let input: HttpRequest

  beforeAll(() => {
    sut = new CreateBillController(categoryRepository)
  })

  beforeEach(() => {
    input = {
      body: {
        type: 'pay',
        category: 'any category id',
        expiration: addDaysToDate(new Date(), 1),
        interest: 0,
        discount: 0,
        total_value: 100,
        observation: '',
        payment_method: 'credit_card',
        occurence: 'weekly'
      }
    }
    categoryRepository.getById.mockResolvedValue({
      id: 'any id',
      name: 'any name'
    })
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
      input.body.category = null

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
      expect(spy).toHaveBeenCalledWith(input.body.total_value)
    })

    test('should return 400 if total_value is not provided', async () => {
      input.body.total_value = null

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('total_value')))
    })

    test('should return 400 if total_value is less than 1', async () => {
      input.body.total_value = 0

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('total_value')))
    })
  })

  describe('paymentMethodValidation', () => {
    test('should call paymentMethodValidation once and with correct payment method', async () => {
      const spy = jest.spyOn(CreateBillController.prototype as unknown as keyof typeof CreateBillController, 'paymentMethodValidation')

      await sut.execute(input)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(input.body.payment_method)
    })

    test('should return 400 if payment_method is not provided', async () => {
      input.body.payment_method = null

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('payment_method')))
    })

    test('should return 400 if invalid payment_method is provided', async () => {
      input.body.payment_method = 'invalid payment method'

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('payment_method')))
    })
  })

  describe('paymentOcurrencesValidation', () => {
    test('should call paymentOcurrencesValidation once and with correct ocurrence', async () => {
      const spy = jest.spyOn(CreateBillController.prototype as unknown as keyof typeof CreateBillController, 'paymentOcurrencesValidation')

      await sut.execute(input)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(input.body.ocurrence)
    })

    test('should return 400 if invalid ocurrence is provided', async () => {
      input.body.ocurrence = 'invalid ocurrence'

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('ocurrence')))
    })
  })
})
