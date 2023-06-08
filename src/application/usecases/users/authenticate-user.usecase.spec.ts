import { AuthenticateUserUseCase } from './authenticate-user.usecase'
import { GetUserByLoginRepositoryInterface } from '@/domain/interfaces/user-repository.interface'
import { AuthenticateUserUseCaseInterface } from '@/application/interfaces/authenticate-user-usecase.interface'
import { HashCompareInterface } from '@/application/interfaces/crypto.interface'
import { TokenGeneratorInterface } from '@/application/interfaces/token.interface'
import { mock } from 'jest-mock-extended'

const userRepositoryStub = mock<GetUserByLoginRepositoryInterface>()
const hashStub = mock<HashCompareInterface>()
const tokenGenerator = mock<TokenGeneratorInterface>()

describe('AuthenticateUserUseCase', () => {
  let sut: AuthenticateUserUseCase
  let input: AuthenticateUserUseCaseInterface.Input

  beforeAll(() => {
    sut = new AuthenticateUserUseCase(userRepositoryStub, hashStub, tokenGenerator)
    input = {
      login: 'anyLogin',
      password: 'anyPassword'
    }
    hashStub.compare.mockResolvedValue(true)
    userRepositoryStub.getByLogin.mockResolvedValue({
      id: 'anyId',
      login: 'anyLogin',
      name: 'anyName',
      password: 'hashedPassword'
    })
  })

  test('should call UserRepository.getByLogin once and with correct login', async () => {
    await sut.execute(input)

    expect(userRepositoryStub.getByLogin).toHaveBeenCalledTimes(1)
    expect(userRepositoryStub.getByLogin).toHaveBeenCalledWith('anyLogin')
  })

  test('should return null if UserRepository.getByLogin returns null', async () => {
    userRepositoryStub.getByLogin.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toBeNull()
  })

  test('should call HashCompare once and with correct values', async () => {
    await sut.execute(input)

    expect(hashStub.compare).toHaveBeenCalledTimes(1)
    expect(hashStub.compare).toHaveBeenCalledWith('anyPassword', 'hashedPassword')
  })

  test('should return null if HashCompare returns false', async () => {
    hashStub.compare.mockResolvedValueOnce(false)

    const output = await sut.execute(input)

    expect(output).toBeNull()
  })

  test('should call TokenGenerator once and with correct values', async () => {
    await sut.execute(input)

    expect(tokenGenerator.generate).toHaveBeenCalledTimes(1)
    expect(tokenGenerator.generate).toHaveBeenCalledWith({ key: { id: 'anyId' } })
  })
})
