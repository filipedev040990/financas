import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

export class GetBillByIdUseCase implements GetBillByIdUseCaseInterface {
  constructor (private readonly billRepository: GetBillByIdRepositoryInterface) {}
  async execute (id: string): Promise<GetBillByIdUseCaseInterface.Output> {
    let output: GetBillByIdUseCaseInterface.Output = null

    const response = await this.billRepository.getByBillId(id)

    if (response) {
      output = {
        bill: {
          id: response.bill.id,
          type: response.bill.type,
          category_id: response.bill.category_id,
          expiration: response.bill.expiration,
          total_value: response.bill.total_value,
          observation: response.bill.observation ?? null,
          status: response.bill.status,
          created_at: response.bill.created_at
        },
        billPayment: null
      }

      if (response.billPayment) {
        output.billPayment = {
          totalValue: response.billPayment.totalValue,
          interest: response.billPayment.interest,
          discount: response.billPayment.discount,
          paymentMethodId: response.billPayment.paymentMethodId,
          reversed: response.billPayment.reversed,
          paymentDate: response.billPayment.created_at
        }
      }
    }

    return output
  }
}

const billRepository = mock<GetBillByIdRepositoryInterface>()

describe('GetBillByIdUseCase', () => {
  let sut: GetBillByIdUseCase
  let output: GetBillByIdRepositoryInterface.Output

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new GetBillByIdUseCase(billRepository)
    output = {
      bill: {
        id: 'any bill id',
        type: 'any type',
        category_id: 'any category id',
        expiration: new Date(),
        total_value: 1000,
        observation: 'Test',
        status: 'open',
        created_at: new Date('2023-01-01')
      },
      billPayment: {
        totalValue: 1000,
        interest: 0,
        discount: 0,
        paymentMethodId: 'any payment method id',
        reversed: false,
        created_at: new Date()
      }
    }

    billRepository.getByBillId.mockResolvedValue(output)
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call BillRepository.getByBillId once and with correct id', async () => {
    await sut.execute('any bill id')

    expect(billRepository.getByBillId).toHaveBeenCalledTimes(1)
    expect(billRepository.getByBillId).toHaveBeenCalledWith('any bill id')
  })

  test('should a bill correctly with bill payment', async () => {
    const output = await sut.execute('any bill id')

    expect(output).toEqual({
      bill: {
        id: 'any bill id',
        type: 'any type',
        category_id: 'any category id',
        expiration: new Date(),
        total_value: 1000,
        observation: 'Test',
        status: 'open',
        created_at: new Date('2023-01-01')
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
  })
})
