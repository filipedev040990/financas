import { HashGeneratorInterface } from '@/application/interfaces/crypto.interface'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashGeneratorInterface {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
