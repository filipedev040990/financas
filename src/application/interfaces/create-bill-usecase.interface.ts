export interface CreateBillUseCaseInterface {
  execute(input: CreateBillUseCaseInterface.Input): Promise<CreateBillUseCaseInterface.Output>
}

export namespace CreateBillUseCaseInterface {
  export type Input = {
    type: string
    category_id: string
    expiration: Date
    totalValue: number
    observation?: string | null
    payment_method_id: string
    status: string
  }

  export type Output = {
    id: string
    type: string
    category_id: string
    expiration: Date
    totalValue: number
    observation?: string | null
    payment_method_id: string
    status: string
    created_at: Date
  }
}
