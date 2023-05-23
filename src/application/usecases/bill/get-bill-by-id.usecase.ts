import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'

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
