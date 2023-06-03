export interface UpdateCategoryUseCaseInterface {
  execute(input: UpdateCategoryUseCaseInterface.Input): Promise<void>
}

export namespace UpdateCategoryUseCaseInterface {
  export type Input = {
    id: string
    name: string
  }
}
