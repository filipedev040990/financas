export interface CreateUserRepositoryInterface {
  save: (input: CreateUserRepositoryInterface.Input) => Promise<CreateUserRepositoryInterface.Output>
}

export namespace CreateUserRepositoryInterface {
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
