export interface GetUserByIdUseCaseInterface {
  execute(id: string): Promise<GetUserByIdUseCaseInterface.Output>
}

export namespace GetUserByIdUseCaseInterface {
  export type Output = {
    id: string
    name: string
    login: string
  } | null
}
