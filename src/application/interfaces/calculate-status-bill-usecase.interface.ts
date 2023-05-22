export interface CalculateStatusBillUseCaseInterface {
  execute(input: CalculateStatusBillUseCaseInterface.Input): Promise<CalculateStatusBillUseCaseInterface.Output>
}

export namespace CalculateStatusBillUseCaseInterface {
  export type Input = {
    expiration: Date
    total_value: number
    billPaymentId?: string
  }

  export type Output = string
}
