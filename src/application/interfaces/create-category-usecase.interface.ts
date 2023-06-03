export interface CreateCategoryUseCaseInterface {
  execute(name: string): Promise<void>
}
