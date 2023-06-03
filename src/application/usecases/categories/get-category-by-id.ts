import { GetCategoryByIdUseCaseInterface } from '@/application/interfaces/get-category-by-id.interface'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'

export class GetCategoryByIdUseCase implements GetCategoryByIdUseCaseInterface {
  constructor (private readonly categoryRepository: GetCategoryByIdRepositoryInterface) {}
  async execute (id: string): Promise<GetCategoryByIdUseCaseInterface.Output> {
    return await this.categoryRepository.getById(id)
  }
}
