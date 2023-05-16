export interface CreateBillUseCaseInterface {
  execute(input: CreateBillUseCaseInterface.Input): Promise<CreateBillUseCaseInterface.Output>
}

export namespace CreateBillUseCaseInterface {
  export type Input = {
    type: string
    category: string
    expiration: Date
    interest: number
    discount: number
    total_value: number
    observation?: string
    payment_method: string
    status: string
  }

  export type Output = {
    id: string
    type: string
    category: string
    expiration: Date
    interest: number
    discount: number
    total_value: number
    observation?: string
    payment_method: string
    status: string
    createdAt: Date
  }
}
