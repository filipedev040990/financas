import MockDate from 'mockdate'

export class UserEntity {
  private readonly id: string
  private readonly name: string
  private readonly password: string
  private readonly createdAt?: Date
  private readonly updatedAt?: Date

  constructor (input: UserEntity.Input) {
    this.id = input.id
    this.name = input.name
    this.password = input.password
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export namespace UserEntity {
  export type Input = {
    id: string
    name: string
    password: string
  }
}

describe('UserEntity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should create a instance of User', () => {
    const user = new UserEntity({
      id: 'any id',
      name: 'any name',
      password: 'any password'
    })

    expect(user).toEqual({
      id: 'any id',
      name: 'any name',
      password: 'any password',
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })
})
