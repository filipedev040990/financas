export const addUserInputSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true,
      example: 'Zé das Couves'
    },
    login: {
      type: 'string',
      required: true,
      example: 'zedascouves'
    },
    password: {
      type: 'string',
      required: true,
      example: '123@abc#**321'
    }
  }
}
