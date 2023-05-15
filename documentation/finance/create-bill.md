# Cadastrar uma nova conta (a pagar/ a receber)

> ## Caso de sucesso

1. ✅ Salva os dados da conta
2. ✅ Calcula status da conta
3. ⛔ Retorna status 201 com os dados da nova conta

> ## Exceções
1. ✅ Retorna 400 se o tipo não for fornecido
2. ✅ Retorna 400 se o tipo for inválido
3. ✅ Retorna 400 se a categoria não for fornecida
4. ✅ Retorna 400 se a categoria for inválida
5. ✅ Retorna 400 se a data de vencimento não for fornecida
6. ✅ Retorna 400 se a data de vencimento for inválida
7. ⛔ Retorna 400 se o valor total não for fornecido
8. ⛔ Retorna 400 se o valor total for inválido
9. ⛔ Retorna 400 se o payment_method não for fornecido
10. ⛔ Retorna 400 se o payment_method for inválido
11. ⛔ Retorna 400 se ocurrence não for fornecido
12. ⛔ Retorna 400 se ocurrence for inválido
13. ⛔ Retorna 500 se houver alguma falha na hora de salvar os dados


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
    status: string (aberto, pago, pago parcial, vencida)
    createdAt: Date // pode ser usado como data de emissão
    updatedAt: Date
}

✅
⛔