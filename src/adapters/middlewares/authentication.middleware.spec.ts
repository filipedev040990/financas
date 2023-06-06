import { mock } from 'jest-mock-extended'
import { JwtMissingError, UnauthorizedError } from '../errors'
import { HttpRequest } from '../types/http.type'
import { AuthenticationMiddleware } from './authentication.middleware'
import { TokenValidatorInterface } from '@/application/interfaces/token.interface'

const tokenValidator = mock<TokenValidatorInterface>()

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let input: HttpRequest

  beforeEach(() => {
    sut = new AuthenticationMiddleware(tokenValidator)
    input = {
      headers: {
        Authorization: 'Bearer anyToken'
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
    input.headers.Authorization = null as any

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
})
