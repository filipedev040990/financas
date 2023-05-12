import { UpdateUserUseCaseInterface } from '@/application/interfaces/update-user-usecase.interface'
import { UpdateUserRepositoryInterface } from '@/domain/interfaces/user-repository.interface'
import { UpdateUserUseCase } from './update-user.usecase'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const userRepository = mock<UpdateUserRepositoryInterface>()

describe('UpdateUserUseCase', () => {
  let sut: UpdateUserUseCase
  let input: UpdateUserUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateUserUseCase(userRepository)
    input = {
      id: 'any id',
      name: 'any name'
    }
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('should call UserRepository.update once and with correct values', async () => {
    await sut.execute(input)

    expect(userRepository.update).toHaveBeenCalledTimes(1)
    expect(userRepository.update).toHaveBeenCalledWith({
      id: 'any id',
      name: 'any name',
      updatedAt: new Date()
    })
  })
})
