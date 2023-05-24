# Retornar uma conta (pagar/receber) pelo id

> ## Caso de sucesso

1. ✅ Retorna dados da conta selecionada junto com pagamento/recebimento se houver

> ## Exceções
1. ✅ Retorna nulo se não existir a conta
2. ✅ Retorna 500 se houver alguma falha na hora de consultar os dados


## Objeto Bill
{
  bill: {
  	id: string
    type: string (pay/receive)
    category_id: string (agua/luz/telefone/etc) //referencia pra tabela de categoria
    expiration: Date
    total_value: number
    observation: long text
    status: string (aberto, pago, pago parcial, vencida)
    created_at: Date // pode ser usado como data de emissão
    updated_at: Date
  },
  billPayment: {
    totalValue: number,
    interest: number,
    discount: number,
    paymentMethodId: string,
    reversed: boolean,
    created_at as paidData
  }

}

✅
⛔