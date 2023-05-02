import { CreateUserUseCaseInterface } from '@/application/interfaces/create-user-usecase.interface'
import { HashGeneratorInterface } from '@/application/interfaces/crypto.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { UserEntity } from '@/domain/entities/user.entity'
import { CreateUserRepositoryInterface } from '@/domain/interfaces/user-repository.interface'
import MockDate from 'mockdate'

export class CreateUserUseCase {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly hashGenerator: HashGeneratorInterface,
    private readonly userRepository: CreateUserRepositoryInterface
  ) {}

  async execute (input: CreateUserUseCaseInterface.Input): Promise<CreateUserUseCaseInterface.Output> {
    const newUser = new UserEntity({
      id: this.uuidGenerator.execute(),
      name: input.name,
      password: this.hashGenerator.execute(input.password)
    })

    return await this.userRepository.save({
      id: newUser.id,
      name: newUser.name,
      password: newUser.password,
      createdAt: newUser.createdAt
    })
  }
}

const uuidGenerator: jest.Mocked<UUIDGeneratorInterface> = {
  execute: jest.fn().mockReturnValue('any uuid')
}

const hashGenerator: jest.Mocked<HashGeneratorInterface> = {
  execute: jest.fn().mockReturnValue('any hash')
}

const userRepository: jest.Mocked<CreateUserRepositoryInterface> = {
  save: jest.fn().mockResolvedValue({ accessToken: 'any access token' })
}

describe('CreateUserUseCase', () => {
  let sut: CreateUserUseCase
  let input: CreateUserUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())

    sut = new CreateUserUseCase(uuidGenerator, hashGenerator, userRepository)

    input = {
      name: 'any name',
      password: 'any password'
    }
  })

  afterAll(() => {
    MockDate.reset()
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

  test('should call UserRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(userRepository.save).toHaveBeenCalledTimes(1)
    expect(userRepository.save).toHaveBeenCalledWith({
      id: 'any uuid',
      name: 'any name',
      password: 'any hash',
      createdAt: new Date()
    })
  })

  test('should return an access token on success', async () => {
    const accessToken = await sut.execute(input)

    expect(accessToken).toEqual({ accessToken: 'any access token' })
  })
})
