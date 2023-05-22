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
    const bill = await prismaClient.bill.findFirst({ where: { id } })
    return bill ?? null
  }
}
