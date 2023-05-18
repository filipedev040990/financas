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
    created_at: Date
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
  } | null
}

export interface GetUserByIdRepositoryInterface {
  getById (id: string): Promise<GetUserByIdRepositoryInterface.Output>
}

export namespace GetUserByIdRepositoryInterface {
  export type Output = {
    id: string
    name: string
    login: string
  } | null
}

export interface UpdateUserRepositoryInterface {
  update(input: UpdateUserRepositoryInterface.Input): Promise<void>
}

export namespace UpdateUserRepositoryInterface {
  export type Input = {
    id: string
    name: string
    updated_at: Date
  }
}
