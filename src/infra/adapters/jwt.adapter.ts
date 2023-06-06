import { TokenGeneratorInterface, TokenValidatorInterface } from '@/application/interfaces/token.interface'
import jwt, { JwtPayload } from 'jsonwebtoken'

export class JwtAdapter implements TokenGeneratorInterface, TokenValidatorInterface {
  constructor (
    private readonly secretKey: string,
    private readonly expirationInMs: number
  ) {}

  generate ({ key }: TokenGeneratorInterface.Input): string {
    return jwt.sign({ key }, this.secretKey, { expiresIn: this.expirationInMs })
  }

  validate ({ token }: TokenValidatorInterface.Input): string | null {
    const generatedToken = jwt.verify(token, this.secretKey) as JwtPayload
    return generatedToken.key
  }
}
