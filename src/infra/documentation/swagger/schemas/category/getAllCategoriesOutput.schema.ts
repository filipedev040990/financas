export const getAllCategoriesOutputSchema = {
  type: 'array',
  items: {
    oneOf: [{
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '0f6359da-7bb6-4d66-bbdc-792399a6889t'
        },
        name: {
          type: 'string',
          example: 'Água'
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
    }, {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '0f6359da-7bb6-4d66-bbdc-792399a6895c'
        },
        name: {
          type: 'string',
          example: 'Luz'
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
    }]
  }
}
