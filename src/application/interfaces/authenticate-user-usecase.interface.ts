export interface AuthenticateUserUseCaseInterface {
  execute(input: AuthenticateUserUseCaseInterface.Input): Promise<string>
}

export namespace AuthenticateUserUseCaseInterface {
  export type Input = {
    login: string
    password: string
  }
}
