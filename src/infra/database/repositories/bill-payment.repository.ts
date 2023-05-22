import { GetBillPaymentByBillIdRepositoryInterface } from '@/domain/interfaces/get-bill-payment-by-billdd-repository.interface'
import { prismaClient } from '../prisma-client'

export class BillPaymentRepositoy implements GetBillPaymentByBillIdRepositoryInterface {
  async getByBillId (id: string): Promise<GetBillPaymentByBillIdRepositoryInterface.Output> {
    const billPayment = await prismaClient.billPayment.findFirst({ where: { billId: id } })
    return billPayment ?? null
  }
}
