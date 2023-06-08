import { HttpRequest } from '@/adapters/types/http.type'
import { AuthenticateUserController } from './authenticate-user.controller'

describe('AuthenticateUserController', () => {
  let sut: AuthenticateUserController
  let input: HttpRequest

  beforeEach(() => {
    sut = new AuthenticateUserController()
    input = {
      body: { login: 'anyLogin', password: 'anyPassword' }
    }
  })
  test('should return 400 if login is not provided', async () => {
    input.body.login = null

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 400,
      body: 'Missing param: login'
    })
  })
})
