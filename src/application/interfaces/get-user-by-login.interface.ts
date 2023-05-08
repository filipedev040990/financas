export interface GetUserByLoginUseCaseInterface {
  execute(login: string): Promise<GetUserByLoginUseCase.Output>
}

export namespace GetUserByLoginUseCase {
  export type Output = {
    id: string
    name: string
    login: string
  }
}
