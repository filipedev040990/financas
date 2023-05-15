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
        payment_method: 'any payment method',
        occurence: 'weekly'
      }
    }
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

    test('should return 400 if validation category fails', async () => {
      jest.spyOn(categoryRepository, 'getById').mockResolvedValueOnce(null)

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new InvalidParamError('category')))
    })
  })
})
