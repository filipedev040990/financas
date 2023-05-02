export class UserEntity {
  public id: string
  public name: string
  public password: string
  public createdAt: Date
  public updatedAt: Date | null

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
