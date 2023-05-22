import { CalculateStatusBillUseCase } from './calculate-status-bill.usecase'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillPaymentByBillIdRepositoryInterface } from '@/domain/interfaces/get-bill-payment-by-billdd-repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

let fakeBill: any

const billPaymentRepository = mock<GetBillPaymentByBillIdRepositoryInterface>()

describe('CalculateStatusBillUseCase', () => {
  let sut: CalculateStatusBillUseCase
  let input: CalculateStatusBillUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new CalculateStatusBillUseCase(billPaymentRepository)
  })

  beforeEach(() => {
    input = {
      expiration: new Date(),
      totalValue: 1000,
      billId: 'any bill id'
    }

    fakeBill = {
      id: ' any id',
      billId: 'any bill id',
      totalValue: 1000,
      interest: 0,
      discount: 0,
      payment_method_id: 'any payment method',
      created_at: new Date('2023-01-01'),
      reversed: false
    }

    billPaymentRepository.getByBillId.mockResolvedValue(fakeBill)
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call billPaymentRepository.getByBillId if id is provided', async () => {
    await sut.execute(input)

    expect(billPaymentRepository.getByBillId).toHaveBeenCalledWith('any bill id')
  })

  test('should return open status', async () => {
    billPaymentRepository.getByBillId.mockResolvedValueOnce(null)

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
    billPaymentRepository.getByBillId.mockResolvedValueOnce(null)
    input.expiration = new Date(new Date().setDate(new Date().getDate()) - 1)

    const output = await sut.execute(input)

    expect(output).toBe('overdue')
  })

  test('should return reversed status', async () => {
    billPaymentRepository.getByBillId.mockResolvedValueOnce({
      id: ' any id',
      billId: 'any bill id',
      totalValue: 1000,
      interest: 0,
      discount: 0,
      payment_method_id: 'any payment method',
      reversed: true,
      created_at: new Date('2023-01-01'),
      updated_at: null
    })
    input.expiration = new Date(new Date().setDate(new Date().getDate()) - 1)

    const output = await sut.execute(input)

    expect(output).toBe('reversed')
  })
})
