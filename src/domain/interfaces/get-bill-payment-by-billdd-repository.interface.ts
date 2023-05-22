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
    paymentMethodId: string
    reversed: boolean
    created_at: Date
    updated_at?: Date | null
  } | null | undefined
}
