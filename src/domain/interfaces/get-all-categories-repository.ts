export interface GetAllCategoriesRepositoryInterface {
  getAll (): Promise<GetAllCategoriesRepositoryInterface.Output[] | null>
}

export namespace GetAllCategoriesRepositoryInterface {
  export type Output = {
    id: string
    name: string
    created_at: Date
    updated_at?: Date
  }
}
