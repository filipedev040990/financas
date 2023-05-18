export interface GetBillByIdRepositoryInterface {
  getById (id: string): Promise<GetBillByIdRepositoryInterface.Output>
}

export namespace GetBillByIdRepositoryInterface {
  export type Output = {
    id: string
    type: string
    category_id: string
    expiration: Date
    interest: number
    discount: number
    total_value: number
    observation?: string | null
    payment_method_id: string
    status: string
    created_at: Date
    updated_at?: Date | null
  } | null | undefined
}
