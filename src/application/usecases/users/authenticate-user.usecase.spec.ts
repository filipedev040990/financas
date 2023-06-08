import { AuthenticateUserUseCase } from './authenticate-user.usecase'
import { GetUserByIdRepositoryInterface } from '@/domain/interfaces/user-repository.interface'
import { AuthenticateUserUseCaseInterface } from '@/application/interfaces/authenticate-user-usecase.interface'
import { mock } from 'jest-mock-extended'

const userRepositoryStub = mock<GetUserByIdRepositoryInterface>()

describe('AuthenticateUserUseCase', () => {
  let sut: AuthenticateUserUseCase
  let input: AuthenticateUserUseCaseInterface.Input

  beforeAll(() => {
    sut = new AuthenticateUserUseCase(userRepositoryStub)
    input = {
      login: 'anyLogin',
      password: 'anyPassword'
    }
  })
  test('should call UserRepository.getById once and with correct login', async () => {
    await sut.execute(input)

    expect(userRepositoryStub.getById).toHaveBeenCalledTimes(1)
    expect(userRepositoryStub.getById).toHaveBeenCalledWith('anyLogin')
  })
})
