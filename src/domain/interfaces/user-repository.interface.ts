export interface CreateUserRepository {
  save: (input: CreateUserRepository.Input) => Promise<CreateUserRepository.Output>
}

export namespace CreateUserRepository {
  export type Input = {
    id: string
    name: string
    password: string
    createdAt: Date
    updatedAt?: Date
  }

  export type Output = {
    accessToken: string
  }
}
