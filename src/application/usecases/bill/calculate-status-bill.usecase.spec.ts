import { InvalidParamError } from '@/adapters/errors'
import { CalculateStatusBillUseCase } from './calculate-status-bill.usecase'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'
import { mock } from 'jest-mock-extended'

let fakeBill: GetBillByIdRepositoryInterface.Output

const billRepository = mock<GetBillByIdRepositoryInterface>()

describe('CalculateStatusBillUseCase', () => {
  let sut: CalculateStatusBillUseCase
  let input: CalculateStatusBillUseCaseInterface.Input

  beforeAll(() => {
    sut = new CalculateStatusBillUseCase(billRepository)
  })

  beforeEach(() => {
    input = {
      expiration: new Date(),
      total_value: 1000,
      billPaymentId: 'any bill paymentId'
    }

    fakeBill = {
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

    billRepository.getById.mockResolvedValue(fakeBill)
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

  test('should return open status', async () => {
    input.billPaymentId = undefined

    const output = await sut.execute(input)

    expect(output).toBe('open')
  })

  test('should return paid status without discount', async () => {
    const output = await sut.execute(input)

    expect(output).toBe('paid')
  })

  test('should return paid status with discount', async () => {
    fakeBill!.total_value = 900
    fakeBill!.discount = 10

    const output = await sut.execute(input)

    expect(output).toBe('paid')
  })

  test('should return paid status when interest exists', async () => {
    fakeBill!.total_value = 1010
    fakeBill!.interest = 10

    const output = await sut.execute(input)

    expect(output).toBe('paid')
  })

  test('should return parcialPaid status', async () => {
    fakeBill!.total_value = 900

    const output = await sut.execute(input)

    expect(output).toBe('parcialPaid')
  })

  test('should return overdue status', async () => {
    input.billPaymentId = undefined
    input.expiration = new Date(new Date().setDate(new Date().getDate()) - 1)

    const output = await sut.execute(input)

    expect(output).toBe('overdue')
  })
})
