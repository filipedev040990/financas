export interface CreateUserRepositoryInterface {
  save(input: CreateUserRepositoryInterface.Input): Promise<void>
}

export namespace CreateUserRepositoryInterface {
  export type Input = {
    id: string
    name: string
    login: string
    accessToken: string
    password: string
    createdAt: Date
  }
}
