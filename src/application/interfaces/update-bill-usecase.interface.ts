export interface UpdateBillUseCaseInterface {
  execute(input: UpdateBillUseCaseInterface.Input): Promise<UpdateBillUseCaseInterface.Output>
}

export namespace UpdateBillUseCaseInterface {
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
