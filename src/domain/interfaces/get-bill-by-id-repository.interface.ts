export interface GetBillByIdRepositoryInterface {
  getByBillId (id: string): Promise<GetBillByIdRepositoryInterface.Output>
}

export namespace GetBillByIdRepositoryInterface {
  export type Output = {
    bill: {
      id: string
      type: string
      category_id: string
      expiration: Date
      total_value: number
      observation: string
      status: string
      created_at: Date
      updated_at?: Date
    }
    billPayment: {
      totalValue: number
      interest: number
      discount: number
      paymentMethodId: string
      reversed: string
      payment_date: Date
    } | null
  } | null
}
