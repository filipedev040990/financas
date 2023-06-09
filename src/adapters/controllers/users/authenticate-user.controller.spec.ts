import { HttpRequest } from '@/adapters/types/http.type'
import { AuthenticateUserController } from './authenticate-user.controller'
import { mock } from 'jest-mock-extended'
import { AuthenticateUserUseCaseInterface } from '@/application/interfaces/authenticate-user-usecase.interface'
import { ServerError } from '@/adapters/errors'

const authenticateUserUseCase = mock<AuthenticateUserUseCaseInterface>()

describe('AuthenticateUserController', () => {
  let sut: AuthenticateUserController
  let input: HttpRequest

  beforeEach(() => {
    sut = new AuthenticateUserController(authenticateUserUseCase)
    input = {
      body: { login: 'anyLogin', password: 'anyPassword' }
    }
    authenticateUserUseCase.execute.mockResolvedValue('anyToken')
  })

  test('should return 400 if login is not provided', async () => {
    input.body.login = null

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 400,
      body: 'Missing param: login'
    })
  })

  test('should return 400 if password is not provided', async () => {
    input.body.password = null

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 400,
      body: 'Missing param: password'
    })
  })

  test('should call AuthenticateUserUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(authenticateUserUseCase.execute).toHaveBeenCalledTimes(1)
    expect(authenticateUserUseCase.execute).toHaveBeenCalledWith({ login: 'anyLogin', password: 'anyPassword' })
  })

  test('should return a token on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: { token: 'anyToken' }
    })
  })

  test('should return 401 if authentication fails', async () => {
    authenticateUserUseCase.execute.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 401,
      body: 'Unauthorized'
    })
  })

  test('should return 500 and throws if AuthenticateUserUseCase throws', async () => {
    authenticateUserUseCase.execute.mockImplementationOnce(() => { throw new Error() })

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 500,
      body: new ServerError(new Error())
    })
  })
})
