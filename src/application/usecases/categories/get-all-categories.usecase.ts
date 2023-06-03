import { GetAllCategoriesRepositoryInterface } from '@/domain/interfaces/get-all-categories-repository'

export class GetAllCategoriesUseCase {
  constructor (private readonly categoryRepository: GetAllCategoriesRepositoryInterface) {}
  async execute (): Promise<any> {
    await this.categoryRepository.getAll()
  }
}
