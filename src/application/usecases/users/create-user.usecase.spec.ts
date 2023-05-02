import { CreateUserUseCaseInterface } from '@/application/interfaces/create-user-usecase.interface'
import { HashGeneratorInterface } from '@/application/interfaces/crypto.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'

export class CreateUserUseCase {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly hashGenerator: HashGeneratorInterface
  ) {}

  async execute (input: CreateUserUseCaseInterface.Input): Promise<void> {
    this.uuidGenerator.execute()
    this.hashGenerator.execute(input.password)
  }
}

const uuidGenerator: jest.Mocked<UUIDGeneratorInterface> = {
  execute: jest.fn().mockReturnValue('any uuid')
}

const hashGenerator: jest.Mocked<HashGeneratorInterface> = {
  execute: jest.fn().mockReturnValue('any hash')
}

describe('CreateUserUseCase', () => {
  let sut: CreateUserUseCase
  let input: CreateUserUseCaseInterface.Input

  beforeAll(() => {
    sut = new CreateUserUseCase(uuidGenerator, hashGenerator)

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

  test('should call HashGenerator.execute once and with correct password', async () => {
    await sut.execute(input)

    expect(hashGenerator.execute).toHaveBeenCalledTimes(1)
    expect(hashGenerator.execute).toHaveBeenCalledWith('any password')
  })
})
