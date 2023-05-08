import { GetUserByLoginRepositoryInterface } from '@/domain/interfaces/user-repository.interface'

export class GetUserByLoginUseCase {
  constructor (private readonly userRepository: GetUserByLoginRepositoryInterface) {}
  async execute (login: string): Promise<void> {
    await this.userRepository.getByLogin(login)
  }
}

const userRepository: jest.Mocked<GetUserByLoginRepositoryInterface> = {
  getByLogin: jest.fn().mockResolvedValue({
    id: 'any id',
    name: 'any name',
    login: 'any login'
  })
}

describe('GetUserByLoginUseCase', () => {
  let sut: GetUserByLoginUseCase

  beforeAll(() => {
    sut = new GetUserByLoginUseCase(userRepository)
  })

  test('should call UserRepository.getById once and with correct login', async () => {
    await sut.execute('any id')

    expect(userRepository.getByLogin).toHaveBeenCalledTimes(1)
    expect(userRepository.getByLogin).toHaveBeenCalledWith('any id')
  })
})
