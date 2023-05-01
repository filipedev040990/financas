export interface CreateUserUseCaseInterface {
  execute: (input: CreateUserUseCaseInterface.Input) => Promise<CreateUserUseCaseInterface.Output>
}

export namespace CreateUserUseCaseInterface {
  export type Input = {
    id: string
    name: string
    password: string
    createdAt: Date
  }

  export type Output = {
    accessToken: string
  }
}
