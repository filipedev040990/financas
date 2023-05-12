import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { HttpRequest } from '../types/http.type'
import { badRequest } from '../helpers/http.helper'
import { MissingParamError } from '../errors'

export class UpdateUserController implements ControllerInterface {
  async execute (input: HttpRequest): Promise<any> {
    if (!input.params?.id) {
      return badRequest(new MissingParamError('id'))
    }
    return null
  }
}

describe('UpdateUserController', () => {
  let sut: UpdateUserController
  let input: HttpRequest

  beforeAll(() => {
    sut = new UpdateUserController()
    input = {
      params: {
        id: 'any id'
      },
      body: {
        name: 'any name'
      }
    }
  })

  test('should return 400 if id is not provided', async () => {
    input.params.id = null

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new MissingParamError('id')))
  })
})
