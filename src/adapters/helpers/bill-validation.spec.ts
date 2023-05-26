import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import { MissingParamError, InvalidParamError } from '../errors'
import { mock } from 'jest-mock-extended'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import { ValidatorBill } from './bill-validation'
import { HttpRequest } from '../types/http.type'

const getBillByIdUseCase = mock<GetBillByIdUseCaseInterface>()
const categoryRepository = mock<GetCategoryByIdRepositoryInterface>()

const addDaysToDate = (date: Date, days: number): Date => {
  return new Date(date.setDate(date.getDate()) + days)
}

describe('ValidatorBill', () => {
  let sut: ValidatorBill
  let input: HttpRequest

  beforeAll(() => {
    sut = new ValidatorBill(getBillByIdUseCase, categoryRepository)
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
    categoryRepository.getById.mockResolvedValue({
      id: 'any id',
      name: 'any name'
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

  describe('idValidatoin', () => {
    test('should call GetBillByIdUseCase.execute once and with correct id', async () => {
      await sut.validate(input)

      expect(getBillByIdUseCase.execute).toHaveBeenCalledTimes(1)
      expect(getBillByIdUseCase.execute).toHaveBeenCalledWith(input.params.id)
    })

    test('should return 400 if GetBillByIdUseCase.execute returns null', async () => {
      getBillByIdUseCase.execute.mockResolvedValueOnce(null)

      const output = await sut.validate(input)

      expect(output).toEqual(new InvalidParamError('bill not found'))
    })
  })

  describe('currentStatusValidation', () => {
    test('should return 400 if current bill status does not open or expired', async () => {
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

      const output = await sut.validate(input)

      expect(output).toEqual(new InvalidParamError('Bill status should be open or expired'))
    })
  })

  describe('paymentTypeValidation', () => {
    test('should return 400 if type is not provided', async () => {
      input.body.type = null

      const output = await sut.validate(input)

      expect(output).toEqual(new MissingParamError('type'))
    })

    test('should return 400 if validation type fails', async () => {
      input.body.type = 'invalid type'

      const output = await sut.validate(input)

      expect(output).toEqual(new InvalidParamError('type'))
    })
  })

  describe('paymentCategoryValidation', () => {
    test('should return 400 if validation category fails', async () => {
      input.body.category_id = null

      const output = await sut.validate(input)

      expect(output).toEqual(new MissingParamError('category_id'))
    })

    test('should call CategoryRepository.getById once and with correct category id', async () => {
      await sut.validate(input)

      expect(categoryRepository.getById).toHaveBeenCalledTimes(1)
      expect(categoryRepository.getById).toHaveBeenCalledWith('any category id')
    })

    test('should return 400 if validation category fails', async () => {
      jest.spyOn(categoryRepository, 'getById').mockResolvedValueOnce(null)

      const output = await sut.validate(input)

      expect(output).toEqual(new InvalidParamError('category_id'))
    })
  })

  describe('paymentExpirationValidation', () => {
    test('should return 400 if expiration is not provided', async () => {
      input.body.expiration = null

      const output = await sut.validate(input)

      expect(output).toEqual(new MissingParamError('expiration'))
    })
  })

  describe('paymentTotalValueValidation', () => {
    test('should return 400 if totalValue is not provided', async () => {
      input.body.totalValue = null

      const output = await sut.validate(input)

      expect(output).toEqual(new MissingParamError('totalValue'))
    })

    test('should return 400 if totalValue is less than 1', async () => {
      input.body.totalValue = -1

      const output = await sut.validate(input)

      expect(output).toEqual(new InvalidParamError('totalValue'))
    })
  })
})
