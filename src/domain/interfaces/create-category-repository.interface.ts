export interface CreateCategoryRepositoryInterface {
  create(input: CreateCategoryRepositoryInterface.Input): Promise<void>
}

export namespace CreateCategoryRepositoryInterface {
  export type Input = {
    id: string
    name: string
    created_at: Date
  }
}
