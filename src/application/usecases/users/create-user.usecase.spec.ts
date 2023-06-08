import { CreateUserUseCaseInterface } from '@/application/interfaces/create-user-usecase.interface'
import { HashGeneratorInterface } from '@/application/interfaces/crypto.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { CreateUserRepositoryInterface } from '@/domain/interfaces/user-repository.interface'
import { CreateUserUseCase } from './create-user.usecase'
import MockDate from 'mockdate'

const uuidGenerator: jest.Mocked<UUIDGeneratorInterface> = {
  execute: jest.fn().mockReturnValue('any uuid')
}

const hashGenerator: jest.Mocked<HashGeneratorInterface> = {
  hash: jest.fn().mockReturnValue('any hash')
}

const userRepository: jest.Mocked<CreateUserRepositoryInterface> = {
  save: jest.fn().mockResolvedValue({
    id: 'any uuid',
    name: 'any name',
    login: 'any login'
  })
}

describe('CreateUserUseCase', () => {
  let sut: CreateUserUseCase
  let input: CreateUserUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())

    sut = new CreateUserUseCase(uuidGenerator, hashGenerator, userRepository)

    input = {
      name: 'any name',
      login: 'any login',
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

  test('should call HashGenerator.hash once and with correct password', async () => {
    await sut.execute(input)

    expect(hashGenerator.hash).toHaveBeenCalledTimes(1)
    expect(hashGenerator.hash).toHaveBeenCalledWith('any password')
  })

  test('should call UserRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(userRepository.save).toHaveBeenCalledTimes(1)
    expect(userRepository.save).toHaveBeenCalledWith({
      id: 'any uuid',
      name: 'any name',
      login: 'any login',
      password: 'any hash',
      created_at: new Date()
    })
  })

  test('should return an user on success', async () => {
    const user = await sut.execute(input)

    expect(user).toEqual({
      id: 'any uuid',
      name: 'any name',
      login: 'any login'
    })
  })
})
