export class UserEntity {
  public id: string
  public name: string
  public login: string
  public password: string
  public created_at: Date
  public updated_at: Date | null

  constructor (input: UserEntity.Input) {
    this.id = input.id
    this.name = input.name
    this.login = input.login
    this.password = input.password
    this.created_at = new Date()
    this.updated_at = new Date()
  }
}

export namespace UserEntity {
  export type Input = {
    id: string
    name: string
    login: string
    password: string
  }
}
