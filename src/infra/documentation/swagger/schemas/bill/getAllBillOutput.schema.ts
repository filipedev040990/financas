export const getAllBillOutputSchema = {
  type: 'array',
  items: {
    oneOf: [{
      type: 'object',
      properties: {
        bill: {
          type: 'object',
          properties: {
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
              example: null
            }
          }
        }
      }
    }, {
      type: 'object',
      properties: {
        bill: {
          type: 'object',
          properties: {
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
              example: '2023-05-31'
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
              example: 'totalPaid'
            },
            created_at: {
              type: 'Date',
              example: '2023-05-26T19:16:57.391Z'
            },
            updated_at: {
              type: 'Date',
              example: null
            }
          }
        },
        billPayment: {
          type: 'object',
          properties: {
            totalValue: {
              type: 'Int',
              example: 10000
            },
            interest: {
              type: 'Int',
              example: 0
            },
            discount: {
              type: 'Int',
              example: 0
            },
            paymentMethodId: {
              type: 'String',
              example: 'e42c4854-8c13-4710-80b4-6b35eba972aa'
            },
            reversed: {
              type: 'boolean',
              example: false
            },
            paymentDate: {
              type: 'Date',
              example: '2023-05-28T18:01:29.000Z'
            }
          }
        }
      }
    }]
  }
}
