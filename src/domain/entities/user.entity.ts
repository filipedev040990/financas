export class UserEntity {
  public id: string
  public name: string
  public login: string
  public password: string
  public accessToken: string | null
  public createdAt: Date
  public updatedAt: Date | null

  constructor (input: UserEntity.Input) {
    this.id = input.id
    this.name = input.name
    this.login = input.login
    this.password = input.password
    this.accessToken = input.accessToken ?? null
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export namespace UserEntity {
  export type Input = {
    id: string
    name: string
    login: string
    password: string
    accessToken?: string
  }
}
