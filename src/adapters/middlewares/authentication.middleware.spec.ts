import { mock } from 'jest-mock-extended'
import { JwtMissingError, UnauthorizedError } from '../errors'
import { HttpRequest } from '../types/http.type'
import { AuthenticationMiddleware } from './authentication.middleware'
import { TokenValidatorInterface } from '@/application/interfaces/token.interface'
import { GetUserByIdUseCaseInterface } from '@/application/interfaces/get-user-by-id.interface'

const tokenValidator = mock<TokenValidatorInterface>()
const getUserByIdUseCase = mock<GetUserByIdUseCaseInterface>()

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let input: HttpRequest

  beforeAll(() => {
    tokenValidator.validate.mockReturnValue('anyUserId')
    getUserByIdUseCase.execute.mockResolvedValue({
      id: 'anyUserId',
      name: 'AnyName',
      login: 'anyLogin'
    })
  })
  beforeEach(() => {
    sut = new AuthenticationMiddleware(tokenValidator, getUserByIdUseCase)
    input = {
      headers: {
        authorization: 'Bearer anyToken'
      }
    }
  })

  test('should return 403 if Authorization header is not provided', async () => {
    input = null as any

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 403,
      body: new JwtMissingError()
    })
  })

  test('should return 403 if Authorization header is falsy', async () => {
    input.headers.authorization = null as any

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 403,
      body: new JwtMissingError()
    })
  })

  test('should call tokenValidator once and with correct values', async () => {
    await sut.execute(input)

    expect(tokenValidator.validate).toHaveBeenCalledTimes(1)
    expect(tokenValidator.validate).toHaveBeenCalledWith({ token: 'anyToken' })
  })

  test('should return 401 if invalid token is provided', async () => {
    tokenValidator.validate.mockReturnValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 401,
      body: new UnauthorizedError()
    })
  })

  test('should call GetUserByIdUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(getUserByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getUserByIdUseCase.execute).toHaveBeenCalledWith('anyUserId')
  })

  test('should return 401 if GetUserByIdUseCase returns null', async () => {
    getUserByIdUseCase.execute.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 401,
      body: new UnauthorizedError()
    })
  })

  test('should return user id on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: 'anyUserId'
    })
  })
})
