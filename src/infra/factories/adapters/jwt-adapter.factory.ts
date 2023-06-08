import { JwtAdapter } from '@/infra/adapters/jwt.adapter'
import config from '@/infra/config'

export const buildJwtAdapter = (): JwtAdapter => {
  return new JwtAdapter(config.jwt.secretkey, config.jwt.expiresInMs)
}
