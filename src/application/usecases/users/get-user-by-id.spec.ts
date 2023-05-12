import { GetUserByIdRepositoryInterface } from '@/domain/interfaces/user-repository.interface'
import { mock } from 'jest-mock-extended'

export class GetUserByIdUseCase {
  constructor (private readonly userRepository: GetUserByIdRepositoryInterface) {}
  async execute (id: string): Promise<void> {
    await this.userRepository.getById(id)
  }
}

const userRepository = mock<GetUserByIdRepositoryInterface>()

describe('GetUserByIdUseCase', () => {
  let sut: GetUserByIdUseCase

  beforeAll(() => {
    sut = new GetUserByIdUseCase(userRepository)
  })

  test('should call UserRepository.getById once and with correct id', async () => {
    await sut.execute('any id')

    expect(userRepository.getById).toHaveBeenCalledTimes(1)
    expect(userRepository.getById).toHaveBeenCalledWith('any id')
  })
})
