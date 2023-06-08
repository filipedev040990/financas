import { TokenGeneratorInterface, TokenValidatorInterface } from '@/application/interfaces/token.interface'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGeneratorInterface, TokenValidatorInterface {
  constructor (
    private readonly secretKey: string,
    private readonly expirationInMs: number
  ) {}

  generate ({ key }: TokenGeneratorInterface.Input): string {
    return jwt.sign({ key }, this.secretKey, { expiresIn: this.expirationInMs })
  }

  validate ({ token }: TokenValidatorInterface.Input): string | null {
    const generatedToken: any = jwt.verify(
      token,
      this.secretKey,
      (error, response) => {
        if (error) {
          return null
        }
        return response
      })
    return generatedToken ? generatedToken.key.id : null
  }
}
