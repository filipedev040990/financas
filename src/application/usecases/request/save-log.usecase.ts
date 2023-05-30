import { SaveRequestUseCaseInterface } from '@/application/interfaces/save-request-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { SaveRequestRepositoryInterface } from '@/domain/interfaces/save-request-repository.interface'

export class SaveRequestUseCase implements SaveRequestUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly requestRepository: SaveRequestRepositoryInterface
  ) {}

  async execute (input: SaveRequestUseCaseInterface.Input): Promise<string> {
    return await this.requestRepository.save({
      id: this.uuidGenerator.execute(),
      originalUrl: input.originalUrl,
      method: input.method,
      ip: input.ip,
      input: input.input,
      created_at: new Date()
    })
  }
}
