export interface CalculateStatusBillUseCaseInterface {
  execute(input: CalculateStatusBillUseCaseInterface.Input): Promise<CalculateStatusBillUseCaseInterface.Output>
}

export namespace CalculateStatusBillUseCaseInterface {
  export type Input = {
    expiration: Date
    totalValue: number
    billId: string
  }

  export type Output = string
}
