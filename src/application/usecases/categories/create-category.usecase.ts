import { CreateCategoryUseCaseInterface } from '@/application/interfaces/create-category-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { CreateCategoryRepositoryInterface } from '@/domain/interfaces/create-category-repository.interface'

export class CreateCategoryUseCase implements CreateCategoryUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly categoryRepository: CreateCategoryRepositoryInterface
  ) {}

  async execute (name: string): Promise<void> {
    await this.categoryRepository.create({
      id: this.uuidGenerator.execute(),
      name,
      created_at: new Date()
    })
  }
}
