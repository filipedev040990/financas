import { CreateBillRepositoryInterface } from '@/domain/interfaces/create-bill-repository.interface'
import { prismaClient } from '../prisma-client'
import { GetBillByIdRepositoryInterface } from '@/domain/interfaces/get-bill-by-id-repository.interface'
import { UpdateBillRepositoryInterface } from '@/domain/interfaces/update-bill-repository.interface'
import { GetAllBillRepositoryInterface } from '@/domain/interfaces/get-all-bill-repository.interface'

export class BillRepository implements CreateBillRepositoryInterface, GetBillByIdRepositoryInterface, UpdateBillRepositoryInterface, GetAllBillRepositoryInterface {
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

  async update (input: UpdateBillRepositoryInterface.Input): Promise<UpdateBillRepositoryInterface.Output> {
    const updatedBill = await prismaClient.bill.update({
      data: {
        type: input.type,
        category_id: input.category_id,
        expiration: input.expiration,
        totalValue: input.totalValue,
        observation: input.observation ?? null,
        status: input.status,
        updated_at: input.updated_at
      },
      where: { id: input.id }
    })

    return {
      id: updatedBill.id,
      type: updatedBill.type,
      category_id: updatedBill.category_id,
      expiration: updatedBill.expiration,
      totalValue: updatedBill.totalValue,
      observation: updatedBill.observation ?? null,
      status: updatedBill.status,
      created_at: updatedBill.created_at,
      updated_at: updatedBill.updated_at as Date
    }
  }

  async getAllBill (): Promise<GetAllBillRepositoryInterface.Output[] | null> {
    const output: GetAllBillRepositoryInterface.Output[] | null = []

    const bills = await prismaClient.bill.findMany({
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
      }
    })

    if (bills) {
      bills.map((res) => {
        const obj: GetBillByIdRepositoryInterface.Output = {
          bill: {
            id: res.id,
            type: res.type,
            category_id: res.category_id,
            expiration: res.expiration,
            totalValue: res.totalValue,
            observation: res.observation ?? undefined,
            status: res.status,
            created_at: res.created_at,
            updated_at: res.updated_at ?? undefined
          }
        }

        if (res.BillPayment) {
          obj.BillPayment = {
            totalValue: res.BillPayment.totalValue,
            interest: res.BillPayment.interest,
            discount: res.BillPayment.discount,
            paymentMethodId: res.BillPayment.paymentMethodId,
            reversed: res.BillPayment.reversed,
            created_at: res.BillPayment.created_at
          }
        }

        output.push(obj)
        return output
      })
    }

    return output
  }
}
