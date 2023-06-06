import { JwtMissingError } from '../errors'
import { HttpRequest } from '../types/http.type'
import { AuthenticationMiddleware } from './authentication.middleware'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let input: HttpRequest

  beforeEach(() => {
    sut = new AuthenticationMiddleware()
    input = {
      headers: {
        Authorization: 'any token'
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
})
