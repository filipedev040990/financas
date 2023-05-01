import { CreateUserUseCaseInterface } from '@/application/interfaces/create-user-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'

export class CreateUserUseCase {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface
  ) {}

  async execute (input: CreateUserUseCaseInterface.Input): Promise<void> {
    this.uuidGenerator.execute()
  }
}

describe('CreateUserUseCase', () => {
  let sut: CreateUserUseCase
  let input: CreateUserUseCaseInterface.Input

  const uuidGenerator: jest.Mocked<UUIDGeneratorInterface> = {
    execute: jest.fn().mockReturnValue('any uuid')
  }

  beforeAll(() => {
    sut = new CreateUserUseCase(uuidGenerator)

    input = {
      id: 'any id',
      name: 'any name',
      password: 'any password',
      createdAt: new Date()
    }
  })

  test('should call UUIDGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.execute).toHaveBeenCalledTimes(1)
  })
})
