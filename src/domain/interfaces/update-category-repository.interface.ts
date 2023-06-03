export interface UpdateCategoryRepositoryInterface {
  update(input: UpdateCategoryRepositoryInterface.Input): Promise<void>
}

export namespace UpdateCategoryRepositoryInterface {
  export type Input = {
    id: string
    name: string
    updated_at: Date
  }
}
