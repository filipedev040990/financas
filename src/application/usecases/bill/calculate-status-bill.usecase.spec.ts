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
      totalValue: 1000,
      billId: 'any bill id'
    }

    fakeBill = {
      id: ' any id',
      type: 'any type',
      category_id: 'any category_id',
      expiration: new Date('2023-01-01'),
      interest: 0,
      discount: 0,
      totalValue: 1000,
      payment_method_id: 'any payment method',
      created_at: new Date('2023-01-01'),
      status: 'open'
    }

    billRepository.getByBillId.mockResolvedValue(fakeBill)
  })

  test('should call BillRepository.getByBillId if id is provided', async () => {
    await sut.execute(input)

    expect(billRepository.getByBillId).toHaveBeenCalledWith('any bill id')
  })

  test('should return open status', async () => {
    billRepository.getByBillId.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toBe('open')
  })

  test('should return totalPaid status without discount', async () => {
    const output = await sut.execute(input)

    expect(output).toBe('totalPaid')
  })

  test('should return totalPaid status with discount', async () => {
    fakeBill!.discount = 10

    const output = await sut.execute(input)

    expect(output).toBe('totalPaid')
  })

  test('should return totalPaid status when interest exists', async () => {
    fakeBill!.totalValue = 1010
    fakeBill!.interest = 10

    const output = await sut.execute(input)

    expect(output).toBe('totalPaid')
  })

  test('should return parcialPaid status', async () => {
    fakeBill!.totalValue = 900

    const output = await sut.execute(input)

    expect(output).toBe('parcialPaid')
  })

  test('should return overdue status', async () => {
    billRepository.getByBillId.mockResolvedValueOnce(null)
    input.expiration = new Date(new Date().setDate(new Date().getDate()) - 1)

    const output = await sut.execute(input)

    expect(output).toBe('overdue')
  })
})
