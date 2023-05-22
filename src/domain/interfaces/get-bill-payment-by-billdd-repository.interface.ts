export interface GetBillPaymentByBillIdRepositoryInterface {
  getByBillId (id: string): Promise<GetBillPaymentByBillIdRepositoryInterface.Output>
}

export namespace GetBillPaymentByBillIdRepositoryInterface {
  export type Output = {
    id: string
    billId: string
    totalValue: number
    interest: number
    discount: number
    payment_method_id: string
    reversed: boolean
    created_at: Date
    updated_at?: Date | null
  } | null | undefined
}
