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
