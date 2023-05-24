import { CreateBillRepositoryInterface } from '@/domain/interfaces/create-bill-repository.interface'
import { prismaClient } from '../prisma-client'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'

export class BillRepository implements CreateBillRepositoryInterface, GetBillByIdRepositoryInterface {
  async create (input: CreateBillRepositoryInterface.Input): Promise<CreateBillRepositoryInterface.Output> {
    return await prismaClient.bill.create({
      data: {
        id: input.id,
        type: input.type,
        category_id: input.category_id,
        expiration: input.expiration,
        totalValue: input.totalValue,
        observation: input.observation ?? null,
        status: input.status,
        created_at: input.created_at,
        updated_at: input.updated_at as Date
      }
    })
  }

  async getByBillId (id: string): Promise<GetBillByIdRepositoryInterface.Output> {
    let output: GetBillByIdRepositoryInterface.Output = null

    const bill = await prismaClient.bill.findFirst({
      select: {
        id: true,
        type: true,
        category_id: true,
        expiration: true,
        totalValue: true,
        observation: true,
        status: true,
        created_at: true,
        updated_at: true,
        BillPayment: {
          select: {
            totalValue: true,
            interest: true,
            discount: true,
            paymentMethodId: true,
            reversed: true,
            created_at: true
          }
        }
      },
      where: { id }
    })

    if (bill) {
      output = {
        bill: {
          id: bill.id,
          type: bill.type,
          category_id: bill.category_id,
          expiration: bill.expiration,
          totalValue: bill.totalValue,
          observation: bill.observation ?? undefined,
          status: bill.status,
          created_at: bill.created_at,
          updated_at: bill.updated_at ?? undefined
        }
      }

      if (bill.BillPayment) {
        output.BillPayment = {
          totalValue: bill.BillPayment.totalValue,
          interest: bill.BillPayment.interest,
          discount: bill.BillPayment.discount,
          paymentMethodId: bill.BillPayment.paymentMethodId,
          reversed: bill.BillPayment.reversed,
          created_at: bill.BillPayment.created_at
        }
      }
    }

    return output
  }
}
