import { HttpRequest } from '../types/http.type'
import { MissingParamError } from '../errors/missing-param.error'
import { badRequest } from '../helpers/http.helper'

export class CreateUserController {
  async execute (input: HttpRequest): Promise<any> {
    if (!input.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    return null
  }
}

describe('CreateUserController', () => {
  let sut: CreateUserController
  let input: HttpRequest

  beforeAll(() => {
    sut = new CreateUserController()

    input = {
      body: {
        name: 'any name',
        password: 'any password'
      }
    }
  })

  test('should return 400 if name is not provided', async () => {
    input.body.name = null

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })
})
