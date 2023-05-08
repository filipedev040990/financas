export interface GetUserByLoginUseCaseInterface {
  execute(login: string): Promise<GetUserByLoginUseCaseInterface.Output>
}

export namespace GetUserByLoginUseCaseInterface {
  export type Output = {
    id: string
    name: string
    login: string
  } | null
}
