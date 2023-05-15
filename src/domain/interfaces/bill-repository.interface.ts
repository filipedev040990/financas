export interface BillRepositoryInterface {
  create(input: BillRepositoryInterface.Input): Promise<BillRepositoryInterface.Output>
}

export namespace BillRepositoryInterface {
  export type Input = {
    id: string
    type: string
    category: string
    expiration: Date
    interest: number
    discount: number
    total_value: number
    observation?: string
    payment_method: string
    occurence: string
    createdAt: Date
    upatedAt?: Date
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
    occurence: string
    createdAt: Date
    updatedAt?: Date
  }
}
