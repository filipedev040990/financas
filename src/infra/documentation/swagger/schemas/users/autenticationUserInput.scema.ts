export const authenticationInputSchema = {
  type: 'object',
  properties: {
    login: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['login', 'password'],
  example: {
    login: 'zedascouves',
    password: '123456789'
  }
}
