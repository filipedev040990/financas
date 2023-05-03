import { HttpRequest } from '../types/http.type'
import { MissingParamError } from '../errors/missing-param.error'
import { badRequest } from '../helpers/http.helper'
import { CreateUserUseCaseInterface } from '@/application/interfaces/create-user-usecase.interface'

export class CreateUserController {
  constructor (private readonly createUserUseCase: CreateUserUseCaseInterface) {}

  async execute (input: HttpRequest): Promise<any> {
    const missingParam = this.validate(input)
    if (missingParam) {
      return badRequest(new MissingParamError(missingParam))
    }

    const { name, password } = input.body
    await this.createUserUseCase.execute({ name, password })
    return null
  }

  private validate (input: HttpRequest): string | undefined {
    const requiredFields = ['name', 'password']

    for (const field of requiredFields) {
      if (!input.body[field]) {
        return field
      }
    }
  }
}

const createUserUseCase: jest.Mocked<CreateUserUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue('any access token')
}

describe('CreateUserController', () => {
  let sut: CreateUserController
  let input: HttpRequest

  beforeAll(() => {
    sut = new CreateUserController(createUserUseCase)
  })

  beforeEach(() => {
    input = {
      body: {
        name: 'any name',
        password: 'any password'
      }
    }
  })

  test('should return 400 if name is no provided', async () => {
    input.body.name = null

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should return 400 if password is no provided', async () => {
    input.body.password = null

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })

  test('should call CreateUserUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(createUserUseCase.execute).toHaveBeenCalledTimes(1)
    expect(createUserUseCase.execute).toHaveBeenCalledWith({
      name: 'any name',
      password: 'any password'
    })
  })
})
