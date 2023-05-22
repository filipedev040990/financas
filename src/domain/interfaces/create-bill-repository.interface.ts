export interface CreateBillRepositoryInterface {
  create(input: CreateBillRepositoryInterface.Input): Promise<CreateBillRepositoryInterface.Output>
}

export namespace CreateBillRepositoryInterface {
  export type Input = {
    id: string
    type: string
    category_id: string
    expiration: Date
    interest: number
    discount: number
    totalValue: number
    observation?: string | null
    payment_method_id: string
    status: string
    created_at: Date
    updated_at?: Date | null
  }

  export type Output = {
    id: string
    type: string
    category_id: string
    expiration: Date
    interest: number
    discount: number
    totalValue: number
    observation?: string | null
    payment_method_id: string
    status: string
    created_at: Date
    updated_at?: Date | null
  }
}
