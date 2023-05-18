import { CreateBillRepositoryInterface } from '@/domain/interfaces/bill-repository.interface'
import { prismaClient } from '../prisma-client'

export class BillRepository implements CreateBillRepositoryInterface {
  async create (input: CreateBillRepositoryInterface.Input): Promise<CreateBillRepositoryInterface.Output> {
    return await prismaClient.bill.create({
      data: {
        id: input.id,
        type: input.type,
        category_id: input.category_id,
        expiration: input.expiration,
        interest: input.interest,
        discount: input.discount,
        total_value: input.total_value,
        observation: input.observation ?? null,
        payment_method_id: input.payment_method_id,
        status: input.status,
        created_at: input.created_at,
        updated_at: input.updated_at as Date
      }
    })
  }
}
