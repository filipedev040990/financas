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
          totalValue: response.bill.totalValue,
          observation: response.bill.observation,
          status: response.bill.status,
          created_at: response.bill.created_at,
          updated_at: response.bill.updated_at
        }
      }

      if (response.BillPayment) {
        output.billPayment = {
          totalValue: response.BillPayment.totalValue,
          interest: response.BillPayment.interest,
          discount: response.BillPayment.discount,
          paymentMethodId: response.BillPayment.paymentMethodId,
          reversed: response.BillPayment.reversed,
          paymentDate: response.BillPayment.created_at
        }
      }
    }

    return output
  }
}
