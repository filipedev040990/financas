export interface UpdateBillRepositoryInterface {
  update(input: UpdateBillRepositoryInterface.Input): Promise<UpdateBillRepositoryInterface.Output>
}

export namespace UpdateBillRepositoryInterface {
  export type Input = {
    id: string
    type: string
    category_id: string
    expiration: Date
    totalValue: number
    observation?: string | null
    status: string
    updated_at: Date
  }

  export type Output = {
    id: string
    type: string
    category_id: string
    expiration: Date
    totalValue: number
    observation?: string | null
    status: string
    created_at: Date
    updated_at: Date
  }
}
