import { HttpRequest } from '@/adapters/types/http.type'
import { CreateCategoryController } from './create-category.controller'
import { badRequest } from '@/adapters/helpers/http.helper'
import { MissingParamError } from '@/adapters/errors'

describe('CreateCategoryController', () => {
  let sut: CreateCategoryController
  let input: HttpRequest

  beforeEach(() => {
    sut = new CreateCategoryController()
    input = {
      body: {
        name: 'any name'
      }
    }
  })

  test('should return 400 if name is not provided', async () => {
    input.body.name = null

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new MissingParamError('name')))
  })
})
