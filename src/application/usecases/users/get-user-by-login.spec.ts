import { GetUserByLoginUseCaseInterface } from '@/application/interfaces/get-user-by-login.interface'
import { GetUserByLoginRepositoryInterface } from '@/domain/interfaces/user-repository.interface'

export class GetUserByLoginUseCase implements GetUserByLoginUseCaseInterface {
  constructor (private readonly userRepository: GetUserByLoginRepositoryInterface) {}
  async execute (login: string): Promise<GetUserByLoginUseCaseInterface.Output> {
    return await this.userRepository.getByLogin(login)
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

  test('should return null if UserRepository.getById returns null', async () => {
    userRepository.getByLogin.mockResolvedValueOnce(null)

    const response = await sut.execute('any id')

    expect(response).toBeNull()
  })

  test('should return an user', async () => {
    const response = await sut.execute('any id')

    expect(response).toEqual({
      id: 'any id',
      name: 'any name',
      login: 'any login'
    })
  })
})
