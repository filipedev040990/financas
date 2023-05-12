import { UpdateUserUseCaseInterface } from '@/application/interfaces/update-user-usecase.interface'
import { UpdateUserRepositoryInterface } from '@/domain/interfaces/user-repository.interface'
import { mock } from 'jest-mock-extended'

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor (private readonly userRepository: UpdateUserRepositoryInterface) {}
  async execute (input: UpdateUserUseCaseInterface.Input): Promise<void> {
    await this.userRepository.update(input)
  }
}

const userRepository = mock<UpdateUserRepositoryInterface>()

describe('UpdateUserUseCase', () => {
  let sut: UpdateUserUseCase
  let input: UpdateUserUseCaseInterface.Input

  beforeAll(() => {
    sut = new UpdateUserUseCase(userRepository)
    input = {
      id: 'any id',
      name: 'any name',
      login: 'any login'
    }
  })

  test('should call UserRepository.update once and with correct values', async () => {
    await sut.execute(input)

    expect(userRepository.update).toHaveBeenCalledTimes(1)
    expect(userRepository.update).toHaveBeenCalledWith({
      id: 'any id',
      name: 'any name',
      login: 'any login'
    })
  })
})
