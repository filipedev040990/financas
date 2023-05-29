export const GetAllBillPath = {
  get: {
    tags: ['Bill'],
    summary: 'Lista as contas cadastradas. Se houver um pagamento/recebimento da conta, será listado também.',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/getAllBillOutputSchema'
            }
          }
        }
      },
      500: {
        description: 'Erro interno do servidor.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/serverErrorSchema'
            }
          }
        }
      }
    }
  }
}
