export const getCategoryOutputSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        example: 'd8e9efde-1162-492c-8b26-588b598ccaac'
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
  }
}
