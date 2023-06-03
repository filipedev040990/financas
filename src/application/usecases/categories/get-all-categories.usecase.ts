import { GetAllCategoriesUseCaseInterface } from '@/application/interfaces/get-all-categories-usecase.interface'
import { GetAllCategoriesRepositoryInterface } from '@/domain/interfaces/get-all-categories-repository'

export class GetAllCategoriesUseCase implements GetAllCategoriesUseCaseInterface {
  constructor (private readonly categoryRepository: GetAllCategoriesRepositoryInterface) {}
  async execute (): Promise<GetAllCategoriesRepositoryInterface.Output [] | null> {
    const categories = await this.categoryRepository.getAll()
    return categories ?? null
  }
}
