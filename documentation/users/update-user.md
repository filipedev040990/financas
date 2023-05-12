# Atualizar dados de um usuário

> ## Caso de sucesso

1. ⛔ Atualiza os dados do usuário
2. ⛔ Retorna status 200 com os dados atualizados

> ## Exceções
1. ⛔ Retorna 400 se o id do usuário não for fornecido
2. ⛔ Retorna 400 se o usuário não existir
3. ⛔ Retorna 400 se o nome do usuário não for fornecido
4. ⛔ Retorna 400 se o login do usuário não for fornecido
5. ⛔ Retorna 400 se o login informado já estiver em uso
6. ⛔ Retorna 500 se houver alguma falha na hora de salvar os dados


## Objeto User
{
  	id: string
    name: string
    login: string
    password: string
    accessToken: string
    createdAt: Date
    updatedAt: Date
}

✅
⛔