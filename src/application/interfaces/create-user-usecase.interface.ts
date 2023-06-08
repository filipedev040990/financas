export interface CreateUserUseCaseInterface {
  execute (input: CreateUserUseCaseInterface.Input): Promise<CreateUserUseCaseInterface.Output>
}

export namespace CreateUserUseCaseInterface {
  export type Input = {
    name: string
    login: string
    password: string
  }

  export type Output = {
    id: string
    name: string
    login: string
  }
}
