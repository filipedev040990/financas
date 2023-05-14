# Cadastrar uma nova conta (a pagar/ a receber)

> ## Caso de sucesso

1. ✅ Salva os dados da conta
2. ✅ Retorna status 201 com os dados da nova conta

> ## Exceções
1. ✅ Retorna 400 se o tipo não for fornecido
2. ✅ Retorna 400 se a categoria não for fornecida
3. ✅ Retorna 400 se a data de vencimento não for fornecida
4. ✅ Retorna 400 se o valor total não for fornecido
5. ✅ Retorna 400 se o payment_method não for fornecido
6. ✅ Retorna 400 se ocurrence não for fornecido
7. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados


## Objeto User
{
  	id: string
    type: string (pay/receive)
    category: string (agua/luz/telefone/etc) //referencia pra tabela de categoria
    expiration: Date
    interest: number
    discount: number
    total_value: number
    observation: long text
    payment_method: string // referencia para metodos de pagamento
    occurence: string
    createdAt: Date // pode ser usado como data de emissão
    updatedAt: Date
}

✅
⛔