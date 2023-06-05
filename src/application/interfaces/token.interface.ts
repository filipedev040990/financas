export interface TokenGeneratorInterface {
  generate(input: TokenGeneratorInterface.Input): string
}

export namespace TokenGeneratorInterface {
  export type Input = {
    key: {
      id: string
    }
  }
}

export interface TokenValidatorInterface {
  validate(input: TokenValidatorInterface.Input): string
}

export namespace TokenValidatorInterface {
  export type Input = {
    token: string
  }
}
