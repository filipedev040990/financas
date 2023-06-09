import { HashCompareInterface, HashGeneratorInterface } from '@/application/interfaces/crypto.interface'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashGeneratorInterface, HashCompareInterface {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
