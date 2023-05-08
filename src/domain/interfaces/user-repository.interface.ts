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

export interface GetUserByLoginRepositoryInterface {
  getByLogin (login: string): Promise<GetUserByLoginRepositoryInterface.Output>
}

export namespace GetUserByLoginRepositoryInterface {
  export type Output = {
    id: string
    name: string
    login: string
  }
}
