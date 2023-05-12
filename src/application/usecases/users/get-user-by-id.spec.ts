import { GetUserByIdUseCaseInterface } from '@/application/interfaces/get-user-by-id.interface'
import { GetUserByIdRepositoryInterface } from '@/domain/interfaces/user-repository.interface'
import { mock } from 'jest-mock-extended'

export class GetUserByIdUseCase implements GetUserByIdUseCaseInterface {
  constructor (private readonly userRepository: GetUserByIdRepositoryInterface) {}
  async execute (id: string): Promise<GetUserByIdUseCaseInterface.Output> {
    return await this.userRepository.getById(id)
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

  test('should reutn null if UserRepository.getById returns null', async () => {
    userRepository.getById.mockResolvedValueOnce(null)

    const output = await sut.execute('any id')

    expect(output).toBeNull()
  })
})
