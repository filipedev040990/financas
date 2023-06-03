export interface GetCategoryByIdUseCaseInterface {
  execute(id: string): Promise<GetCategoryByIdUseCaseInterface.Output>
}

export namespace GetCategoryByIdUseCaseInterface {
  export type Output = {
    id: string
    name: string
  } | null
}
