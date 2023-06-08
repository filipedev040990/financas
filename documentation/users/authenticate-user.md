# Cadastrar um novo usuário para acessar o sistema

> ## Caso de sucesso

1. ✅ Valida os dados do usuário
2. ✅ Gera um token de acesso com o id do usuário
3. ✅ Retorna status 200 com um token de acesso

> ## Exceções
1. ✅ Retorna 400 se o login do usuário não for fornecido
2. ✅ Retorna 400 se a senha do usuário não for fornecida
3. ✅ Retorna 401 se não existir o usuário
4. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados


## Objeto Authentication
{
  login: string
  password: string
}

✅
⛔