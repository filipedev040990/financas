export interface TokenGeneratorInterface {
  generate(input: TokenGeneratorInterface.Input): string
}

export namespace TokenGeneratorInterface {
  export type Input = {
    data: any
  }
}
