export interface GetAllBillRepositoryInterface {
  getAllBill (): Promise<GetAllBillRepositoryInterface.Output[] | null>
}

export namespace GetAllBillRepositoryInterface {
  export type Output = {
    bill: {
      id: string
      type: string
      category_id: string
      expiration: Date
      totalValue: number
      observation?: string
      status: string
      created_at: Date
      updated_at?: Date
    }
    BillPayment?: {
      totalValue: number
      interest: number
      discount: number
      paymentMethodId: string
      reversed: boolean
      created_at: Date
    }
  }
}
