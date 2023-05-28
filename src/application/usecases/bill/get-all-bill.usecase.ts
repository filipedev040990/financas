import { GetAllBillUseCaseInterface } from '@/application/interfaces/get-all-bill.interface'
import { GetAllBillRepositoryInterface } from '@/domain/interfaces/get-all-bill-repository.interface'

export class GetAllBillUseCase implements GetAllBillUseCaseInterface {
  constructor (private readonly billRepository: GetAllBillRepositoryInterface) {}
  async execute (): Promise<GetAllBillUseCaseInterface.Output[] | null> {
    const output: GetAllBillUseCaseInterface.Output[] | null = []

    const response = await this.billRepository.getAllBill()

    if (response) {
      response.map((res) => {
        const obj: GetAllBillUseCaseInterface.Output = {
          bill: {
            id: res.bill.id,
            type: res.bill.type,
            category_id: res.bill.category_id,
            expiration: res.bill.expiration,
            totalValue: res.bill.totalValue,
            observation: res.bill.observation,
            status: res.bill.status,
            created_at: res.bill.created_at,
            updated_at: res.bill.updated_at
          }
        }

        if (res.BillPayment) {
          obj.billPayment = {
            totalValue: res.BillPayment.totalValue,
            interest: res.BillPayment.interest,
            discount: res.BillPayment.discount,
            paymentMethodId: res.BillPayment.paymentMethodId,
            reversed: res.BillPayment.reversed,
            paymentDate: res.BillPayment.created_at
          }
        }

        output.push(obj)
        return output
      })
    }

    return output.length ? output : null
  }
}
