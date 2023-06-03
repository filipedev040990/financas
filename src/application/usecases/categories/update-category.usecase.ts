import { UpdateCategoryUseCaseInterface } from '@/application/interfaces/update-category-usecase.interface'
import { UpdateCategoryRepositoryInterface } from '@/domain/interfaces/update-category-repository.interface'

export class UpdateCategoryUseCase implements UpdateCategoryUseCaseInterface {
  constructor (private readonly categoryRepository: UpdateCategoryRepositoryInterface) {}

  async execute (input: UpdateCategoryUseCaseInterface.Input): Promise<void> {
    await this.categoryRepository.update({
      id: input.id,
      name: input.name,
      updated_at: new Date()
    })
  }
}
