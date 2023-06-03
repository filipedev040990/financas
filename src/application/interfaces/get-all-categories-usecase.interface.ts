export interface GetAllCategoriesUseCaseInterface {
  execute(): Promise<GetAllCategoriesUseCaseInterface.Output>
}

export namespace GetAllCategoriesUseCaseInterface {
  export type Output = {
    id: string
    name: string
    created_at: Date
    updated_at?: Date
  } | null
}
