import { InvalidParamError } from '@/adapters/errors'
import { CalculateStatusBillUseCase } from './calculate-status-bill.usecase'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'
import { mock } from 'jest-mock-extended'

const fakeBill = {
  id: ' any id',
  type: 'any type',
  category_id: 'any category_id',
  expiration: new Date('2023-01-01'),
  interest: 0,
  discount: 0,
  total_value: 1000,
  payment_method_id: 'any payment method',
  created_at: new Date('2023-01-01'),
  status: 'open'
}

const billRepository = mock<GetBillByIdRepositoryInterface>()

describe('CalculateStatusBillUseCase', () => {
  let sut: CalculateStatusBillUseCase
  let input: CalculateStatusBillUseCaseInterface.Input

  beforeAll(() => {
    sut = new CalculateStatusBillUseCase(billRepository)
    billRepository.getById.mockResolvedValue(fakeBill)
  })

  beforeEach(() => {
    input = {
      expiration: new Date(),
      billPaymentId: 'any bill paymentId'
    }
  })

  test('should call BillRepository.getById if id is provided', async () => {
    await sut.execute(input)

    expect(billRepository.getById).toHaveBeenCalledWith('any bill paymentId')
  })

  test('should not call BillRepository.getById if id is not provided', async () => {
    input.billPaymentId = undefined

    await sut.execute(input)

    expect(billRepository.getById).not.toBeCalled()
  })

  test('should throw if invalid id is provided', async () => {
    billRepository.getById.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('billPaymentId'))
  })

  test('should be null payment propertie', async () => {
    input.billPaymentId = undefined

    await sut.execute(input)

    expect(sut.payment).toBeNull()
  })

  test('should set payment propertie with payment data', async () => {
    await sut.execute(input)

    expect(sut.payment).toEqual({
      id: ' any id',
      type: 'any type',
      category_id: 'any category_id',
      expiration: new Date('2023-01-01'),
      interest: 0,
      discount: 0,
      total_value: 1000,
      payment_method_id: 'any payment method',
      created_at: new Date('2023-01-01'),
      status: 'open'
    })
  })
})
