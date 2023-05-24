export interface GetBillByIdUseCaseInterface {
  execute(id: string): Promise<GetBillByIdUseCaseInterface.Output>
}

export namespace GetBillByIdUseCaseInterface {
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
    billPayment?: {
      totalValue: number
      interest: number
      discount: number
      paymentMethodId: string
      reversed: boolean
      paymentDate: Date
    }
  } | null
}
