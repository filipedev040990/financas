export interface GetCategoryByIdRepositoryInterface {
  getById (id: string): Promise<GetCategoryByIdRepositoryInterface.Output>
}

export namespace GetCategoryByIdRepositoryInterface {
  export type Output = {
    id: string
    name: string
  }
}
