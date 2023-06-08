export interface AuthenticateUserUseCaseInterface {
  execute(input: AuthenticateUserUseCaseInterface.Input): Promise<AuthenticateUserUseCaseInterface.Output>
}

export namespace AuthenticateUserUseCaseInterface {
  export type Input = {
    login: string
    password: string
  }
  export type Output = string | null
}
