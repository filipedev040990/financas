export interface CalculateStatusBillUseCaseInterface {
  execute(input: CalculateStatusBillUseCaseInterface.Input): Promise<CalculateStatusBillUseCaseInterface.Output>
}

export namespace CalculateStatusBillUseCaseInterface {
  export type Input = {
    expiration: Date
    billPaymentId?: string
  }

  export type Output = string
}
