export const updateBillInputSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      required: true,
      example: 'pay',
      description: 'Indica se é uma conta a pagar (pay) ou receber (receive)'
    },
    category_id: {
      type: 'string',
      required: true,
      example: '0f6359da-7bb6-4d66-bbdc-792399a6895c',
      description: 'Indica a categoria da conta'
    },
    expiration: {
      type: 'Date',
      required: true,
      example: '2023-01-01',
      description: 'Indica a data de vencimento da conta'
    },
    totalValue: {
      type: 'Int',
      required: true,
      example: 10000,
      description: 'Indica em centavos o valor da conta'
    },
    observation: {
      type: 'string',
      required: false,
      example: 'Conta de luz do mês de maio'
    }
  }
}
