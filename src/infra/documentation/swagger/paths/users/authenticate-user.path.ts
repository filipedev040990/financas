export const AuthenticateUserPath = {
  post: {
    tags: ['User'],
    summary: 'Rota para autenticação de usuários.',
    description: 'Essa rota pode ser executada por **qualquer usuário**',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/authenticationInputSchema'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOnsiaWQiOiI3ZDk4MmJiOC0zMTM4LTRkZTMtYjJkNS04NTVmMjI2MjYwYTEifSwiaWF0IjoxNjg2MjI3Mjk3LCJleHAiOjE3NzI2MjcyOTd9.FxFbD0GNrkz3_V85CBl-6RJXY9xhLernp_6c3JqVgaI'
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Requisição inválida',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Missing param: login'
                }
              }
            }
          }
        }
      },
      401: {
        description: 'Não autorizado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Unauthorized'
                }
              }
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
