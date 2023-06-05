import { TokenGeneratorInterface, TokenValidatorInterface } from '@/application/interfaces/token.interface'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGeneratorInterface {
  constructor (
    private readonly secretKey: string,
    private readonly expirationInMs: number
  ) {}

  generate ({ key }: TokenGeneratorInterface.Input): string {
    return jwt.sign({ key }, this.secretKey, { expiresIn: this.expirationInMs })
  }

  validate ({ token }: TokenValidatorInterface.Input): void {
    jwt.verify(token, this.secretKey)
  }
}
