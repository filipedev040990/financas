export const updateBillOutputSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'd8e9efde-1162-492c-8b26-588b598ccaac'
    },
    type: {
      type: 'string',
      example: 'pay'
    },
    category_id: {
      type: 'string',
      example: '0f6359da-7bb6-4d66-bbdc-792399a6895c'
    },
    expiration: {
      type: 'Date',
      example: '2023-01-01'
    },
    totalValue: {
      type: 'Int',
      example: 10000
    },
    observation: {
      type: 'string',
      example: 'Conta de luz do mês de maio'
    },
    status: {
      type: 'string',
      example: 'open'
    },
    created_at: {
      type: 'Date',
      example: '2023-05-26T19:16:57.391Z'
    },
    updated_at: {
      type: 'Date',
      example: '2023-05-26T19:16:57.391Z'
    }
  }
}
