# Cadastrar um novo usuário para acessar o sistema

> ## Caso de sucesso

1. ✅ Salva os dados do usuário
2. ✅ Retorna status 201 com um token de acesso

> ## Exceções
1. ✅ Retorna 400 se o nome do usuário não for fornecido
2. ✅ Retorna 400 se a senha do usuário não for fornecida
3. ✅ Retorna 400 se o login do usuário não for fornecido
4. ✅ Retorna 400 se o login informado já estiver em uso
5. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados


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