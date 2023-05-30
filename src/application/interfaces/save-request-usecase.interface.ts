export interface SaveRequestUseCaseInterface {
  execute(input: SaveRequestUseCaseInterface.Input): Promise<string>
}

export namespace SaveRequestUseCaseInterface {
  export type Input = {
    originalUrl: string
    method: string
    ip: string
    input: string
  }
}
