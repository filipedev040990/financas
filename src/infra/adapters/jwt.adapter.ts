import { TokenGeneratorInterface } from '@/application/interfaces/token.interface'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGeneratorInterface {
  constructor (
    private readonly secretKey: string,
    private readonly expirationInMs: number
  ) {}

  generate (input: TokenGeneratorInterface.Input): string {
    return jwt.sign({ key: input.key }, this.secretKey, { expiresIn: this.expirationInMs })
  }
}
